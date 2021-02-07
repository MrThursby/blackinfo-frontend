<template>
  <div class="container py-5">
    <MenusList />
  </div>
</template>

<script>
  import MenusList from "@/components/navigation/MenusList";
  export default {
    components: {MenusList},
    layout: 'manage',
    name: "navigation",
    async fetch({store, error}) {
      if (store.state.navigation.menus.length === 0) {
        await store.dispatch("navigation/fetchMenus").catch(e => {
          error({message: e.response.data.message, status: e.response.status})
        })
      }
      await store.dispatch("pages/fetch").catch(e => {
        error({message: e.response.data.message, status: e.response.status})
      })
    },
  }
</script>

<style scoped>

</style>
