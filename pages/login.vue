<template>
  <div class="d-flex flex-column f10auto container">
    <div class="d-flex flex-column f10auto row justify-content-center align-items-center py-5">
      <div class="col-12 col-md-6 col-lg-4 my-4">
        <div class="card">
          <div class="card-header text-center">Вход</div>
          <div class="card-body">
            <form @submit.prevent="userLogin">
              <div class="form-group">
                <label for="exampleInputEmail1">Email адрес</label>
                <input
                  type="email"
                  v-model="form.username"
                  class="form-control"
                  id="exampleInputEmail1"
                  aria-describedby="emailHelp"
                />
              </div>
              <div class="form-group">
                <label for="exampleInputPassword1">Пароль</label>
                <input
                  type="password"
                  v-model="form.password"
                  class="form-control"
                  id="exampleInputPassword1"
                />
              </div>
              <div class="form-group d-flex align-items-center">
                <button type="submit" class="btn btn-primary">Войти</button>
                <nuxt-link class="px-3" to="/forgot-password">Забыли пароль?</nuxt-link>
              </div>
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
    middleware: 'auth',
    auth: 'guest',
    data() {
      return {
        form: {
          username: "",
          password: "",
          grant_type: "password",
          scope: "*",
        },
        loading: false,
      }
    },
    computed: {
      client_id() {
        return process.env.CLIENT_ID
      },
      client_secret() {
        return process.env.CLIENT_SECRET
      },
    },
    methods: {
      async userLogin() {
        if(this.loading === false) {
          this.loading = true
          await this.$auth.loginWith("primary", {data: this.form}).then(() => {
            this.$auth.fetchUser();
            this.loading = false;
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
            });
            this.loading = false;
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
    },
  };
</script>
