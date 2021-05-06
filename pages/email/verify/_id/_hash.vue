<template>
  <div class="container">
    <div class="row justify-content-center py-5">
      <div class="col-cl-10 col-xxl-8">
        <Loading v-if="verified === null"/>
        <div v-if="verified === true" class="h1">Email подтверждён</div>
        <div v-if="verified === false" class="h1">
          Неизвестная ошибка. Email не подтверждён. Попробуйте позже.
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import Loading from "~/components/Loading";

  export default {
    name: "verify-email",
    middleware: 'auth',
    layout: 'verify',
    data() {
      return {
        verified: null,
      }
    },
    async mounted() {
      await this.$axios
        .$get('/api/email/verify/' + this.$route.params.id + '/' + this.$route.params.hash, {
          params: {
            expires: this.$route.query.expires,
            signature: this.$route.query.signature,
          }
        })
        .then(r => {
          this.verified = true
          this.$auth.fetchUser()
        }).catch(e => {
          this.verified = false
        })
    },
    components: {Loading}
  }
</script>

<style scoped>

</style>
