<template>
  <div class="container py-5">
    <PagesList/>
  </div>
</template>

<script>
  import PagesList from "@/components/pages/PagesList";
  export default {
    components: {PagesList},
    layout: 'manage',
    name: "index",
    async fetch({store, error}) {
      if (store.state.profiles.profiles.length === 0) {
        await store.dispatch("pages/fetch").catch(e => {
          error({message: e.response.data.message, status: e.response.status})
        })
      }
    },
  }
</script>

<style scoped>

</style>
