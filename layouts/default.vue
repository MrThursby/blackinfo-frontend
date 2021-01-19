<template>
  <div class="min-vh-100 d-flex flex-column">
    <Navbar sitename="BlackInfo" class="sticky-top" />
    <main class="content d-flex flex-column f10auto">
      <div class="container">
        <div class="row justify-content-center">
          <div class="col">
            <b-alert v-if="$auth.user !== undefined && $auth.user.email_verified_at !== null" class="mt-3 mb-0" variant="warning" show fade>
              <h4>Внимание</h4>
              На ваш Email отправлено письмо с подтверждением. <br>
              Откройте письмо и нажмите "Подтвердить Email" <br>
              Если письмо не пришло, вы можете <a role="button" class="cursor-pointer text-decoration-underline" @click="getVerificationEmail"> потворить отправку. </a>
            </b-alert>
          </div>
        </div>
      </div>
      <Nuxt />
    </main>
    <Footer />
  </div>
</template>

<script>
import Navbar from '~/components/Navbar'
import Footer from '~/components/Footer'
import {name} from '~/package.json'
export default {
  methods: {
    async getVerificationEmail() {
      await this.$axios.post('/api/email/verification-notification').then(r => {
        this.$bvToast.toast(`Письмо успешно отправленно`, {
          title: "BlackInfo",
          autoHideDelay: 5000,
          variant: "success",
          appendToast: false,
        })
      }).catch(e => {
        this.$bvToast.toast(`Ошибка. Попробуйте позже`, {
          title: "BlackInfo",
          autoHideDelay: 5000,
          variant: "danger",
          appendToast: false,
        })
      })
    }
  },
  components: {
    Navbar, Footer
  }
}
</script>

<style scoped>
.content {
  flex: 1 0 auto;
}
</style>
