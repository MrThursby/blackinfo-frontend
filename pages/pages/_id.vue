<template>
  <div class="container my-5">
    <div class="row justify-content-center">
      <transition name="page">
        <div v-if="page.id === Number($route.params.id)"
             class="col-xl-10 col-xxl-8" v-html="$md.render(page.content)"></div>
      </transition>
    </div>
  </div>
</template>

<script>
  export default {
    name: "pages-show",
    async fetch({store, params}) {
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
