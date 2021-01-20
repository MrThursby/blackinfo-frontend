<template>
  <div class="container">
    <div class="row justify-content-center align-items-center py-5">
      <div class="col-12 col-lg-10 col-xl-8 my-4 px-0 pb-3">
        <div class="card">
          <div class="card-header text-center">Регистрация</div>
          <div class="card-body">
            <form @submit.prevent="register">
              <div class="form-row">
                <div class="col-md-6">
                  <div class="form-group">
                    <label for="name">Коммерческое название организации</label>
                    <input
                      v-model="form.name"
                      type="text"
                      class="form-control"
                      :class="{'is-invalid': form_errors.name !== ''}"
                      id="name"
                    />
                    <div v-if="!!form_errors.name"
                         v-for="(error, index) of form_errors.name"
                         :key="index" class="invalid-feedback">{{error}}</div>
                  </div>
                  <div class="form-group">
                    <label for="organization_name"
                    >Название организации (ООО / ИП)</label
                    >
                    <input
                      v-model="form.organization_name"
                      type="text"
                      class="form-control"
                      :class="{'is-invalid': form_errors.organization_name !== ''}"
                      id="organization_name"
                    />
                    <div v-if="!!form_errors.organization_name"
                         v-for="(error, index) of form_errors.organization_name"
                         :key="index" class="invalid-feedback">{{error}}</div>
                  </div>
                  <div class="form-group">
                    <label for="email">Email адрес</label>
                    <input
                      v-model="form.email"
                      type="email"
                      class="form-control"
                      :class="{'is-invalid': form_errors.email !== ''}"
                      id="email"
                    />
                    <div v-if="!!form_errors.email"
                         v-for="(error, index) of form_errors.email"
                         :key="index" class="invalid-feedback">{{error}}</div>
                  </div>
                </div>
                <div class="col-md-6">
                  <div class="form-group">
                    <label for="inn">ИНН</label>
                    <input
                      v-model="form.inn"
                      type="text"
                      class="form-control"
                      :class="{'is-invalid': form_errors.inn !== ''}"
                      id="inn"
                    />
                    <div v-if="!!form_errors.inn"
                         v-for="(error, index) of form_errors.inn"
                         :key="index" class="invalid-feedback">{{error}}</div>
                  </div>
                  <div class="form-group">
                    <label for="ogrn">ОГРН / ОГРНИП</label>
                    <input
                      v-model="form.ogrn"
                      type="text"
                      class="form-control"
                      :class="{'is-invalid': form_errors.ogrn !== ''}"
                      id="ogrn"
                    />
                    <div v-if="!!form_errors.ogrn"
                         v-for="(error, index) of form_errors.ogrn"
                         :key="index" class="invalid-feedback">{{error}}</div>
                  </div>
                  <div class="form-group">
                    <label for="phone">Номер телефона</label>
                    <input
                      v-model="form.phone"
                      type="text"
                      class="form-control"
                      :class="{'is-invalid': form_errors.phone !== ''}"
                      id="phone"
                    />
                    <div v-if="!!form_errors.phone"
                         v-for="(error, index) of form_errors.phone"
                         :key="index" class="invalid-feedback">{{error}}</div>
                  </div>
                </div>
              </div>
              <div class="form-group">
                <label for="password">Пароль</label>
                <input
                  v-model="form.password"
                  type="password"
                  class="form-control"
                  :class="{'is-invalid': form_errors.password !== ''}"
                  id="password"
                />
                <div v-if="!!form_errors.password"
                     v-for="(error, index) of form_errors.password"
                     :key="index" class="invalid-feedback">{{error}}</div>
              </div>
              <div class="form-group">
                <label for="passwordConfirmation">Повторите пароль</label>
                <input
                  v-model="form.password_confirmation"
                  type="password"
                  class="form-control"
                  id="passwordConfirmation"
                />
              </div>
              <button type="submit" class="btn btn-primary">
                Зарегистрироваться
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    layout: "default",
    name: 'register',
    middleware: "auth",
    auth: "guest",
    data: () => ({
      form: {
        name: "",
        organization_name: "",
        email: "",
        inn: "",
        ogrn: "",
        phone: "",
        password: "",
        password_confirmation: "",
      },
      form_errors: {
        name: "",
        organization_name: "",
        email: "",
        inn: "",
        ogrn: "",
        phone: "",
        password: "",
        password_confirmation: "",
      },
      loading: false,
    }),
    methods: {
      async register() {
        if(this.loading === false) {
          this.loading = true
          await this.$axios.$post("/api/register", this.form).then(() => {
            this.login()
            this.loading = false
          }).catch(e => {
            if(e.response.status === 422){
              this.form_errors = {
                name: e.response.data.errors.name ?? "",
                organization_name: e.response.data.errors.organization_name ?? "",
                email: e.response.data.errors.email ?? "",
                inn: e.response.data.errors.inn ?? "",
                ogrn: e.response.data.errors.ogrn ?? "",
                phone: e.response.data.errors.phone ?? "",
                password: e.response.data.errors.password ?? "",
                password_confirmation: e.response.data.errors.password_confirmation ?? "",
              }
            } else {
              let msg
              switch (e.response.status) {
                case 400:
                  //if(e.response.error === "invalid_grant"){
                  msg = 'Неверный логин или пароль'
                  //}
                  break
                case 401:case 500:case 504:
                  msg = "Ошибка. Попробуйте позже"
                  break
                default:
                  msg = "Неизвестная ошибка. Попробуйте позже"
                  break
              }
              this.$bvToast.toast(msg, {
                title: "BlackInfo",
                autoHideDelay: 5000,
                variant: "danger",
                appendToast: false,
              })
            }
            this.loading = false
          })
        } else {
          this.$bvToast.toast("Операция выполняется, подождите", {
            title: "BlackInfo",
            autoHideDelay: 5000,
            variant: "warning",
            appendToast: false,
          })
        }
      },
      async login() {
          await this.$auth.loginWith("primary", {
            data: {
              username: this.form.email,
              password: this.form.password,
              grant_type: "password",
              client_id: process.env.clientId,
              scope: "*",
              client_secret: process.env.clientSecret,
            },
          }).then(() => {
            this.$router.push('/clients')
          }).catch(e => {
            let msg
            switch (e.response.status) {
              case 400:
                //if(e.response.error === "invalid_grant"){
                msg = 'Неверный логин или пароль'
                //}
                break
              case 401:case 500:case 504:
                msg = "Ошибка. Попробуйте позже"
                break
              default:
                msg = "Неизвестная ошибка. Попробуйте позже"
                break
            }
            this.$bvToast.toast(msg, {
              title: "BlackInfo",
              autoHideDelay: 5000,
              variant: "danger",
              appendToast: false,
            })
          })
      },
    },
  };
</script>
