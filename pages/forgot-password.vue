<template>
  <div class="d-flex flex-column f10auto container">
    <div class="d-flex flex-column f10auto row justify-content-center align-items-center py-5">
      <div class="col-12 col-md-6 col-lg-4 my-4">
        <div class="card">
          <div class="card-header text-center">Сбросить пароль</div>
          <div class="card-body">
            <form @submit.prevent="resetPassword">
              <div class="form-group">
                <label for="email">E-Mail адрес</label>
                <input
                  type="email"
                  v-model="email"
                  :class="{'is-invalid': form_errors.email !== undefined}"
                  class="form-control"
                  id="email"
                  required
                />
                <div v-if="!!form_errors.email"
                     v-for="(error, index) of form_errors.email"
                     :key="index" class="invalid-feedback">{{error}}</div>
              </div>
              <button type="submit" class="btn btn-primary">Сбросить пароль</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ForgorPassword',
  data: () => ({
      email: "",
      loading: false,
      form_errors: {},
  }),
  methods: {
    async resetPassword() {
      if(this.loading === false) {
        this.loading = true;
          await await this.$axios.$post("/api/forgot-password", {email: this.email}).then(() => {
            this.$bvToast.toast('На ваш email отправленно сообщение', {
              title: "BlackInfo",
              autoHideDelay: 5000,
              variant: "success",
              appendToast: false,
            })
            this.loading = false
            this.form_errors = {}
          }).catch(e => {
            this.loading = false
            if(e.response.status === 422){
              this.form_errors = {
                  email: e.response.data.errors.email
              }
            }
            else {
              this.form_errors = {}
              this.$bvToast.toast('Ошибка. Попробуйте позже.', {
                title: "BlackInfo",
                autoHideDelay: 5000,
                variant: "danger",
                appendToast: false,
              })
            }
          })
        }
        else {
          this.$bvToast.toast('Операция выполняется, подождите', {
            title: "BlackInfo",
            autoHideDelay: 5000,
            variant: "warning",
            appendToast: false,
          })
        }
      }
  }
}
</script>