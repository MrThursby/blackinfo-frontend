<template>
  <div class="bg-light">
    <Navbar class="fixed-top" sitename="BlackInfo" />
    <div class="container">
      <nuxt />
    </div>
  </div>
</template>

<script>
import Navbar from "@/components/Navbar"
export default {
  components: {
    Navbar
  }
}
</script>