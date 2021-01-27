<template>
  <form @submit.prevent="updateMenuItem">
    <div class="form-group">
      <label for="title">Текст ссылки (отображается в меню)</label>
      <input v-model="form.title" type="text" class="form-control"
             :class="{'is-invalid': !!form_errors.title && form_errors.title.length !== 0}" id="title">
      <div v-if="!!form_errors.title" v-for="(error, index) of form_errors.title" :key="index"
           class="invalid-feedback">{{error}}
      </div>
    </div>
    <div class="form-group">
      <label for="page_id">Название (только для администраторов)</label>
      <select v-model="form.page_id" class="form-control" id="page_id"
              :class="{'is-invalid': !!form_errors.page_id && form_errors.page_id.length !== 0}">
        <option :value="item.page.id">{{ item.page.title }}</option>
        <option v-for="(page, index) of pages"
                v-if="page.id !== item.page.id"
                :key="index"
                :value="page.id">{{ page.title }}
        </option>
      </select>
      <div v-if="!!form_errors.page_id" v-for="(error, index) of form_errors.page_id" :key="index"
           class="invalid-feedback">{{error}}
      </div>
    </div>
    <div class="row">
      <div class="col">
        <button class="btn btn-success" type="submit">Сохранить</button>
      </div>
      <div class="col-auto">
        <button class="btn btn-danger" type="button" @click="deleteMenuItem">Удалить</button>
        <button class="btn btn-secondary" type="button" @click="hideModal">Отмена</button>
      </div>
    </div>
  </form>
</template>

<script>
  export default {
    name: "ItemEditForm",
    data() {
      return {
        form: {
          title: this.item.title ?? "",
          page_id: this.item.page.id ?? null,
        },
        form_errors: {
          title: [],
          page_id: [],
        },
      }
    },
    computed: {
      pages() {
        return this.$store.getters["pages/pages"]
      },
    },
    props: {
      item: {
        id: {type: Number, required: true},
        title: {type: String, required: true},
        page: {
          id: {type: Number, required: true},
          title: {type: String, required: true},
        }
      },
      menu_id: {type: Number, required: true},
    },
    methods: {
      async updateMenuItem() {
        await this.$axios.$put('/api/menus/' + this.menu_id + '/items/' + this.item.id, this.form)
          .then(() => {
            this.$bvToast.toast(`Элемент меню успешно обновлён`, {
              title: "BlackInfo",
              autoHideDelay: 5000,
              variant: "success",
              appendToast: false,
            });
            this.$store.dispatch("navigation/fetch")
            this.$store.dispatch("navigation/fetchMenus")
            this.hideModal()
          }).catch(e => {
            if (e.response.status === 422) {
              this.form_errors = e.response.data.errors
            } else {
              this.$bvToast.toast(`Ошибка. Элемент меню не сохранён. Попробуйте позже.`, {
                title: "BlackInfo",
                autoHideDelay: 5000,
                variant: "danger",
                appendToast: false,
              });
            }
          })
      },
      async deleteMenuItem() {
        await this.$axios.$delete('/api/menus/' + this.menu_id + '/items/' + this.item.id).then(() => {
          this.$root.$emit('bv::hide::modal', 'items-edit')
          this.$store.dispatch("navigation/fetch")
          this.$store.dispatch("navigation/fetchMenus").then(() => {
            this.$bvToast.toast(`Элемент меню успешно удалён`, {
              title: "BlackInfo",
              autoHideDelay: 5000,
              variant: "success",
              appendToast: false,
            })
          })
        }).catch(() => {
          this.$bvToast.toast(`Ошибка. Элемент меню не удалён. Попробуйте позже`, {
            title: "BlackInfo",
            autoHideDelay: 5000,
            variant: "danger",
            appendToast: false,
          });
        })
      },
      hideModal() {
        this.$root.$emit('bv::hide::modal', 'items-edit')
      },
    }
  }
</script>

<style scoped>

</style>
