<template>
  <div class="container my-5 py-xl-5">
    <div class="row align-items-center justify-content-center">
      <div class="col-md-8">
        <div class="card">
          <div class="card-header text-center">
            Добавить соискателя
          </div>
          <div class="card-body">
            <form @submit.prevent="createClient">
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
                  <label class="custom-control-label" v-if="form.violation_status === false" for="violation_status">Не
                    возмещён</label>
                  <label class="custom-control-label" v-if="form.violation_status === true" for="violation_status">Возмещён</label>
                </div>
              </div>
              <button type="submit" class="btn btn-primary">Добавить</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  layout: 'manage',
  data() {
    return {
      form: {
        first_name: null,
        last_name: null,
        middle_name: null,
        date_of_birth: null,
        phone: null,
        passport: null,
        passport_issued_by: null,
        passport_issued_date: null,
        violation: null,
        violation_status: false,
      },
      form_errors: {
        first_name: [],
        last_name: [],
        middle_name: [],
        date_of_birth: [],
        phone: [],
        passport: [],
        passport_issued_by: [],
        passport_issued_date: [],
        violation: [],
        violation_status: [],
      }
    }
  },
  methods: {
    async createClient() {
      await this.$axios.$post("/api/clients", this.form).then(r => {
        this.$bvToast.toast(`Соикатель сохранён`, {
          title: "BlackInfo",
          autoHideDelay: 5000,
          variant: "success",
          appendToast: false,
        })
        this.$router.push("/clients")
      }).catch(e => {
        if(e.response.status === 422) {
          this.form_errors = e.response.data.errors
        }
        if(e.response.status !== 422) {
          this.$bvToast.toast(e.response.data.message, {
            title: "BlackInfo",
            autoHideDelay: 5000,
            variant: "danger",
            appendToast: false,
          })
        }
      })
    }
  },
}
</script>
