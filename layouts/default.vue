<template>
  <div class="min-vh-100 d-flex flex-column">
    <Navbar sitename="BlackInfo" class="sticky-top" />
    <main class="content d-flex flex-column f10auto">
      <div class="container">
        <div class="row justify-content-center">
          <div class="col">
            <b-alert v-if="$auth.loggedIn === true && $auth.user.email_verified_at === null" class="mt-3 mb-0" variant="warning"
                     :show="true" fade>
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
    <!-- Yandex.Metrika counter -->
    <script type="text/javascript" >
       (function(m,e,t,r,i,k,a){m[i]=m[i]||function(){(m[i].a=m[i].a||[]).push(arguments)};
       m[i].l=1*new Date();k=e.createElement(t),a=e.getElementsByTagName(t)[0],k.async=1,k.src=r,a.parentNode.insertBefore(k,a)})
       (window, document, "script", "https://mc.yandex.ru/metrika/tag.js", "ym");

       ym(72774967, "init", {
            clickmap:true,
            trackLinks:true,
            accurateTrackBounce:true,
            webvisor:true
       });
    </script>
    <noscript><div><img src="https://mc.yandex.ru/watch/72774967" style="position:absolute; left:-9999px;" alt="" /></div></noscript>
    <!-- /Yandex.Metrika counter -->
  </div>
</template>

<script>
import Navbar from '~/components/Navbar'
import Footer from '~/components/Footer'
export default {
  methods: {
    async getVerificationEmail() {
      await this.$axios.post('/api/email/verification-notification').then(() => {
        this.$bvToast.toast(`Письмо успешно отправленно`, {
          title: "BlackInfo",
          autoHideDelay: 5000,
          variant: "success",
          appendToast: false,
        })
      }).catch(() => {
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
