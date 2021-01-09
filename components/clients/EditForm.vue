<template>
  <form @submit.prevent="updateClient">
    <div class="form-row">
      <div class="col-md-6">
        <div class="form-group">
          <label for="last_name">Фамилия</label>
          <input v-model="form.last_name" type="text" class="form-control" :class="{'is-invalid': !!form_errors.last_name && form_errors.last_name.length !== 0}" id="last_name">
          <div v-if="!!form_errors.last_name" v-for="(error, index) of form_errors.last_name" :key="index" class="invalid-feedback">{{error}}</div>
        </div>
        <div class="form-group">
          <label for="first_name">Имя</label>
          <input v-model="form.first_name" type="text" class="form-control" :class="{'is-invalid': !!form_errors.first_name && form_errors.first_name.length !== 0}" id="first_name">
          <div v-if="!!form_errors.first_name" v-for="(error, index) of form_errors.first_name" :key="index" class="invalid-feedback">{{error}}</div>
        </div>
        <div class="form-group">
          <label for="middle_name">Отчество</label>
          <input v-model="form.middle_name" type="text" class="form-control" :class="{'is-invalid': !!form_errors.middle_name && form_errors.middle_name.length !== 0}" id="middle_name">
          <div v-if="!!form_errors.middle_name" v-for="(error, index) of form_errors.middle_name" :key="index" class="invalid-feedback">{{error}}</div>
        </div>
        <div class="form-group">
          <label for="date_of_birth">Дата рождения</label>
          <input v-model="form.date_of_birth" type="date" class="form-control" :class="{'is-invalid': !!form_errors.date_of_birth && form_errors.date_of_birth.length !== 0}" id="date_of_birth">
          <div v-if="!!form_errors.date_of_birth" v-for="(error, index) of form_errors.date_of_birth" :key="index" class="invalid-feedback">{{error}}</div>
        </div>
      </div>
      <div class="col-md-6">
        <div class="form-group">
          <label for="passport">Серия и номер пасспорта</label>
          <input v-model="form.passport" type="text" class="form-control" :class="{'is-invalid': !!form_errors.passport && form_errors.passport.length !== 0}" id="passport">
          <div v-if="!!form_errors.passport" v-for="(error, index) of form_errors.passport" :key="index" class="invalid-feedback">{{error}}</div>
        </div>
        <div class="form-group">
          <label for="passport_issued_by">Кем выдан</label>
          <input v-model="form.passport_issued_by" type="text" class="form-control" :class="{'is-invalid': !!form_errors.passport_issued_by && form_errors.passport_issued_by.length !== 0}" id="passport_issued_by">
          <div v-if="!!form_errors.passport_issued_by" v-for="(error, index) of form_errors.passport_issued_by" :key="index" class="invalid-feedback">{{error}}</div>
        </div>
        <div class="form-group">
          <label for="passport_issued_date">Когда выдан</label>
          <input v-model="form.passport_issued_date" type="date" class="form-control" :class="{'is-invalid': !!form_errors.passport_issued_date && form_errors.passport_issued_date.length !== 0}"
                 id="passport_issued_date">
          <div v-if="!!form_errors.passport_issued_date" v-for="(error, index) of form_errors.passport_issued_date" :key="index" class="invalid-feedback">{{error}}</div>
        </div>
        <div class="form-group">
          <label for="phone">Номер телефона</label>
          <input v-model="form.phone" type="text" class="form-control" :class="{'is-invalid': !!form_errors.phone && form_errors.phone.length !== 0}" id="phone">
          <div v-if="!!form_errors.phone" v-for="(error, index) of form_errors.phone" :key="index" class="invalid-feedback">{{error}}</div>
        </div>
      </div>
    </div>

    <div class="form-group">
      <label for="violation">Нарушение</label>
      <textarea class="form-control" v-model="form.violation" id="violation" :class="{'is-invalid': !!form_errors.violation && form_errors.violation.length !== 0}" rows="5"></textarea>
      <div v-if="!!form_errors.violation" v-for="(error, index) of form_errors.violation" :key="index" class="invalid-feedback">{{error}}</div>
    </div>
    <div class="form-group">
      <label for="violation_status">Ущерб</label>
      <div class="custom-control custom-switch">
        <input v-model="form.violation_status" type="checkbox" class="custom-control-input"
               id="violation_status">
        <label class="custom-control-label" v-if="!!form.violation_status === false" for="violation_status">Не
          возмещён</label>
        <label class="custom-control-label" v-if="!!form.violation_status === true" for="violation_status">Возмещён</label>
      </div>
    </div>
    <div class="form-group mb-0">
      <button class="btn btn-primary" id="clientModalSubmit" type="submit">Сохранить</button>
      <button @click="hideModal" class="btn btn-secondary" id="clientModalHide" type="button">Отмена</button>

      <button @click="deleteClient" class="btn btn-danger float-right" id="clientDelete" type="button">Удалить</button>
    </div>
  </form>
</template>

<script>
import moment from 'moment'

export default {
  data() {
    return {
      form: {
        first_name: this.client.first_name,
        middle_name: this.client.middle_name,
        last_name: this.client.last_name,
        date_of_birth: moment(this.client.date_of_birth, 'DD.MM.YYYY').format('YYYY-MM-DD'),
        phone: this.client.phone,
        passport: this.client.passport,
        passport_issued_date: moment(this.client.passport_issued_date, 'DD.MM.YYYY').format('YYYY-MM-DD'),
        passport_issued_by: this.client.passport_issued_by,
        violation: this.client.violation,
        violation_status: this.client.violation_status,
      },
      form_errors: {
        first_name: null,
        middle_name: null,
        last_name: null,
        date_of_birth: null,
        phone: null,
        passport: null,
        passport_issued_date: null,
        passport_issued_by: null,
        violation: null,
        violation_status: null,
      }
    }
  },
  props: {
    //form: {type: Object, required: true},
    client: {
      first_name: {type: String, default: ''},
      middle_name: {type: String, default: ''},
      last_name: {type: String, default: ''},
      date_of_birth: {type: String, default: ''},
      phone: {type: String, default: ''},
      passport: {type: String, default: ''},
      passport_issued_date: {type: String, default: ''},
      passport_issued_by: {type: String, default: ''},
      violation: {type: String, default: ''},
      violation_status: {type: Boolean, default: ''},
    }
  },
  methods: {
    async updateClient() {
      await this.$axios.$put('/api/clients/' + this.client.id, this.form).then(r => {
        this.$root.$emit('bv::hide::modal', 'clients-edit', '#clientModalSubmit')
        this.$store.dispatch("clients/reFetchCurrent")
        this.$bvToast.toast(`Соискатель успешно обновлён`, {
          title: "BlackInfo",
          autoHideDelay: 5000,
          variant: "success",
          appendToast: false,
        });
        this.$store.dispatch("clients/reFetch")
      }).catch(e => {
        if(e.response.status === 422){
          this.form_errors = e.response.data.errors
        }
      })
    },
    async deleteClient() {
      try {
        const response = await this.$axios.$delete('/api/clients/' + this.client.id)
        if (response.success === true) {
          this.$root.$emit('bv::hide::modal', 'clients-edit', '#clientDelete')
          this.$bvToast.toast(`Соискатель успешно удалён`, {
            title: "BlackInfo",
            autoHideDelay: 5000,
            variant: "info",
            appendToast: false,
          });
          await this.$store.dispatch("clients/reFetch")
        }
      } catch (e) {
        console.log(e)
      }
    },
    hideModal() {
      this.$root.$emit('bv::hide::modal', 'clients-edit', '#clientModalHide')
    },
  }
}
</script>
