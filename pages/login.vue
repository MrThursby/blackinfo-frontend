<template>
  <div class="row justify-content-center vh-100 align-items-center py-5">
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
            <button type="submit" class="btn btn-primary">Войти</button>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  layout: "auth",
  middleware: 'auth',
  auth: 'guest',
  data: () => ({
    form: {
      username: "",
      password: "",
      grant_type: "password",
      client_id: 2,
      scope: "*",
      client_secret: "oxWBwtWbs2dYC7cx0W71mwMgH2Ro3yftDjZkRPVI",
    },
  }),
  methods: {
    async userLogin() {
      try {
        let response = await this.$auth.loginWith("primary", { data: this.form });
        this.$auth.fetchUser();
      } catch (error) {
        this.$bvToast.toast(`Логин или пароль не верный`, {
          title: "BlackInfo",
          autoHideDelay: 5000,
          variant: "danger",
          appendToast: false,
        });
      }
    },
  },
};
</script>
