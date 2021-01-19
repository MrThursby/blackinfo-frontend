<template>
  <div class="min-vh-100 d-flex flex-column">
    <Navbar sitename="BlackInfo" class="sticky-top" />
    <main class="content d-flex flex-column f10auto">
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
