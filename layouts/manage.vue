<template>
  <div class="min-vh-100 d-flex flex-column">
    <ManageNavbar sitename="BlackInfo" class="sticky-top"/>
    <main class="content d-flex flex-column f10auto">
      <Nuxt/>
    </main>
    <Footer/>
  </div>
</template>

<script>
  import ManageNavbar from "@/components/ManageNavbar";
  import Footer from "@/components/Footer";

  export default {
    name: "manage",
    components: {
      ManageNavbar, Footer
    }
  }
</script>

<style scoped>

</style>
