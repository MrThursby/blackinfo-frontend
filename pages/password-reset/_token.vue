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
                  v-model="form.email"
                  :class="{'is-invalid': form_errors.email !== undefined}"
                  class="form-control"
                  id="email"
                  required
                />
                <div v-if="!!form_errors.email"
                     v-for="(error, index) of form_errors.email"
                     :key="index" class="invalid-feedback">{{error}}</div>
              </div>
              <div class="form-group">
                <label for="password">Пароль</label>
                <input
                  type="password"
                  v-model="form.password"
                  :class="{'is-invalid': form_errors.password !== undefined}"
                  class="form-control"
                  id="password"
                  required
                />
                <div v-if="!!form_errors.password"
                     v-for="(error, index) of form_errors.email"
                     :key="index" class="invalid-feedback">{{error}}</div>
              </div>
              <div class="form-group">
                <label for="password-confirmation">Подтверждение пароля</label>
                <input
                  type="password"
                  v-model="form.password_confirmation"
                  class="form-control"
                  id="password-confirmation"
                  required
                />
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
  name: 'PasswordReset',
  data: () => ({
    loading: false,
    form: {
      email: "",
      token: "",
      password: "",
      password_confirmation: ""
    },
    form_errors: {},
  }),
  created() {
    this.form.token = this.$route.params.token
  },
  methods: {
      async resetPassword() {
          if(this.loading === false) {
              this.loading = true
              await await this.$axios.$post("/api/reset-password", this.form).then(() => {
                this.$bvToast.toast('Пароль успешно обновлён. Войдите.', {
                  title: "BlackInfo",
                  autoHideDelay: 5000,
                  variant: "success",
                  appendToast: false,
                })
                this.form_errors = {}
              }).catch(e => {
                if(e.response.status === 422){
                  if(e.response.data.errors.password === undefined){
                    this.$bvToast.toast('Ошибка. Ссылка на восстановление пароля устарела', {
                      title: "BlackInfo",
                      autoHideDelay: 5000,
                      variant: "danger",
                      appendToast: false,
                    })
                  } else {
                    this.form_errors = {
                        password: e.response.data.errors.password
                    }
                  }
                } else {
                  this.$bvToast.toast('Ошибка. Попробуйте позже', {
                    title: "BlackInfo",
                    autoHideDelay: 5000,
                    variant: "danger",
                    appendToast: false,
                  })
                  this.form_errors = {}
                }
              })
              this.loading = false
          } else {
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