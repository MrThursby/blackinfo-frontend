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
                      id="name"
                    />
                  </div>
                  <div class="form-group">
                    <label for="organization_name"
                    >Название организации (ООО / ИП)</label
                    >
                    <input
                      v-model="form.organization_name"
                      type="text"
                      class="form-control"
                      id="organization_name"
                    />
                  </div>
                  <div class="form-group">
                    <label for="email">Email адрес</label>
                    <input
                      v-model="form.email"
                      type="email"
                      class="form-control"
                      id="email"
                    />
                  </div>
                </div>
                <div class="col-md-6">
                  <div class="form-group">
                    <label for="inn">ИНН</label>
                    <input
                      v-model="form.inn"
                      type="text"
                      class="form-control"
                      id="inn"
                    />
                  </div>
                  <div class="form-group">
                    <label for="ogrn">ОГРН / ОГРНИП</label>
                    <input
                      v-model="form.ogrn"
                      type="text"
                      class="form-control"
                      id="ogrn"
                    />
                  </div>
                  <div class="form-group">
                    <label for="phone">Номер телефона</label>
                    <input
                      v-model="form.phone"
                      type="text"
                      class="form-control"
                      id="phone"
                    />
                  </div>
                </div>
              </div>
              <div class="form-group">
                <label for="password">Пароль</label>
                <input
                  v-model="form.password"
                  type="password"
                  class="form-control"
                  id="password"
                />
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
  }),
  methods: {
    async register() {
      try {
        const response = await this.$axios.$post("/api/register", this.form);
        await this.login();
      } catch (e) {
        console.log(e);
      }
    },
    async login() {
      try {
        const login = await this.$auth.loginWith("primary", {
          data: {
            username: this.form.email,
            password: this.form.password,
            grant_type: "password",
            client_id: process.env.clientId,
            scope: "*",
            client_secret: process.env.clientSecret,
          },
        });
      } catch (e) {
        console.log(e);
      }
    },
  },
};
</script>
