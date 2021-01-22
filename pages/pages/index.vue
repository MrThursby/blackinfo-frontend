<template>
  <div class=""></div>
</template>

<script>
  export default {
    name: "index",
    async fetch({error}) {
      error({message: 'Page not found', status: 404})
    }
  }
</script>

<style scoped>

</style>
