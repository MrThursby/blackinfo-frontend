<template>
  <div class="min-vh-100 d-flex flex-column">
    <Navbar sitename="BlackInfo" class="sticky-top" />
    <main class="content">
      <div class="container" v-if="$auth.user !== null && $auth.user.email_verified_at === null">
        <b-alert class="mt-3 mb-0" variant="warning" show dismissible fade>На ваш Email отправлено письмо с подтверждением. <a href="#"> Потворить отправку. </a></b-alert>
      </div>
      <Nuxt />
    </main>
    <Footer />
  </div>
</template>

<script>
import Navbar from '~/components/Navbar'
import Footer from '~/components/Footer'
import {name} from '~/package.json'
export default {
  components: {
    Navbar, Footer
  }
}
</script>

<style scoped>
.content {
  flex: 1 0 auto;
}
</style>
