<template>
  <div class="container my-5">
    <div class="row justify-content-start">
      <div class="col-xl-10 col-xxl-8" v-html="page.content"></div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "_id.vue",
    async fetch({store, params}){
      await store.dispatch('pages/fetchCurrent', params.id);
    },
    computed: {
      page() {
        return this.$store.getters['pages/current'];
      }
    },
  }
</script>

<style scoped>

</style>
