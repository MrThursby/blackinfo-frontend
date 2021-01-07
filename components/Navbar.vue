<template>
  <b-navbar toggleable="lg" type="dark" variant="primary">
    <div class="container">
      <b-navbar-brand to="/">{{ sitename }}</b-navbar-brand>

      <b-navbar-toggle class="p-1 outline-none" target="nav-collapse"></b-navbar-toggle>

      <b-collapse id="nav-collapse" is-nav>
        <b-navbar-nav class="mb-1 mb-lg-0">
          <b-nav-item to="/" active-class="active" exact>Главная</b-nav-item>
          <b-nav-item to="/clients" v-if="$auth.loggedIn === true" active-class="active">Соискатели</b-nav-item>
        </b-navbar-nav>

        <b-navbar-nav v-if="$auth.loggedIn === false" class="ml-auto mb-2 mb-lg-0">
          <b-nav-item to="/login" active-class="active">Вход</b-nav-item>
          <b-nav-item to="/register" active-class="active">Регистрация</b-nav-item>
        </b-navbar-nav>

        <b-navbar-nav v-if="$auth.loggedIn === true" class="ml-auto mb-2 mb-lg-0">
          <b-nav-item-dropdown :text="$auth.user.name" right>
          <b-dropdown-item href="#" active-class="active">Профиль</b-dropdown-item>
          <b-dropdown-item href="#" v-if="$auth.user.role === 'admin'" active-class="active">Настройки</b-dropdown-item>
          <b-dropdown-divider></b-dropdown-divider>
          <b-dropdown-item @click="logoutUser">Выход</b-dropdown-item>
        </b-nav-item-dropdown>
        </b-navbar-nav>
      </b-collapse>
    </div>
  </b-navbar>
</template>

<script>
export default {
  props: {
    sitename: { type: String, default: "App" },
  },
  methods: {
      async logoutUser(){
        await this.$auth.logout()
      }
  },
};
</script>

<style lang="scss">
.navbar .nav-link {
  padding-top: 1px !important;
  padding-bottom: 1px !important;
  outline: none;
}
.navbar-toggler-icon {
    width: 1.2em;
    height: 1.2em;
}
</style>
