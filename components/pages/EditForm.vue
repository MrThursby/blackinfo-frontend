<template>
  <form @submit.prevent="updatePage">
    <div class="form-group">
      <label for="title">Название (только для администраторов)</label>
      <input v-model="form.title" type="text" class="form-control"
             :class="{'is-invalid': !!form_errors.title && form_errors.title.length !== 0}" id="title">
      <div v-if="!!form_errors.title" v-for="(error, index) of form_errors.title" :key="index"
           class="invalid-feedback">{{error}}
      </div>
    </div>
    <div class="form-group">
      <label for="content">Контент (Markdown)</label>
      <textarea v-model="form.content" rows="15" class="form-control"
                :class="{'is-invalid': !!form_errors.content && form_errors.content.length !== 0}"
                id="content"></textarea>
      <div v-if="!!form_errors.content" v-for="(error, index) of form_errors.content" :key="index"
           class="invalid-feedback">{{error}}
      </div>
    </div>
    <div class="row">
      <div class="col">
        <button class="btn btn-success" type="submit">Сохранить</button>
      </div>
      <div class="col-auto">
        <button class="btn btn-danger" type="button" @click="deletePage">Удалить</button>
        <button class="btn btn-secondary" type="button" @click="hideModal">Отмена</button>
      </div>
    </div>
  </form>
</template>

<script>
  export default {
    name: "EditForm",
    data() {
      return {
        form: {
          title: this.page.title ?? "",
          content: this.page.content ?? "",
        },
        form_errors: {
          title: [],
          content: [],
        },
      }
    },
    props: {
      page: {
        title: {type: String, required: true},
        content: {type: String, required: true}
      },
    },
    methods: {
      async updatePage() {
        await this.$axios.$put('/api/pages/' + this.page.id, this.form).then(() => {
          this.$bvToast.toast(`Страница успешно обновлена`, {
            title: "BlackInfo",
            autoHideDelay: 5000,
            variant: "success",
            appendToast: false,
          });
          this.$store.dispatch("pages/fetch")
        }).catch(e => {
          if(e.response.status === 422){
            this.form_errors = e.response.data.errors
          } else {
            this.$bvToast.toast(`Ошибка. Страница не сохранена. Попробуйте позже.`, {
              title: "BlackInfo",
              autoHideDelay: 5000,
              variant: "danger",
              appendToast: false,
            });
          }
        })
      },
      async deletePage() {
        await this.$axios.$delete('/api/pages/' + this.page.id).then(() => {
          this.$root.$emit('bv::hide::modal', 'clients-edit', '#clientDelete')
          this.$store.dispatch("pages/fetch").then(() => {
            this.$bvToast.toast(`Страница успешно удалена`, {
              title: "BlackInfo",
              autoHideDelay: 5000,
              variant: "success",
              appendToast: false,
            })
          })
        }).catch(() => {
          this.$bvToast.toast(`Ошибка. Страница не удалена. Попробуйте позже`, {
            title: "BlackInfo",
            autoHideDelay: 5000,
            variant: "danger",
            appendToast: false,
          });
        })
      },
      hideModal() {
        this.$root.$emit('bv::hide::modal', 'pages-edit')
      },
    }
  }
</script>

<style scoped>

</style>
