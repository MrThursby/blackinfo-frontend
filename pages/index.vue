<template>
  <div class="container my-5">
    <div class="row justify-content-center">
      <div class="col-xl-10 col-xxl-8" v-html="$md.render(page.content)"></div>
    </div>
  </div>
</template>

<script>
  export default {
    async fetch({store}) {
      await store.dispatch('pages/fetchCurrent', 1);
    },
    computed: {
      page() {
        return this.$store.getters['pages/current']
      }
    },
  };
</script>

<style>
</style>
