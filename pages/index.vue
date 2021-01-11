<template>
  <div class="container my-5">
    <div class="row justify-content-start">
      <div class="col-xl-10 col-xxl-8" v-html="page.content"></div>
    </div>
  </div>
</template>

<script>
export default {
  computed: {
    page() {
      return this.$store.getters['pages/current']
    }
  },
  mounted() {
    this.$store.dispatch('pages/fetchCurrent', 1)
  }
};
</script>

<style>
</style>
