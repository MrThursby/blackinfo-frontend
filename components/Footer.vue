<template>
  <div>
    <div class="bg-secondary py-3">
      <div class="container text-center">
        Если у вас возникли какие-то вопросы или предложения, пишите по этому адресу:
        <a href="mailto:support@blackinfo.ru">support@blackinfo.ru</a>
      </div>
    </div>
    <footer class="bg-dark text-light py-4">
      <div class="container">
        <div class="row">
          <div class="col-auto pb-3 pb-sm-0">
            <h5>BlackInfo</h5>
            <ul class="nav flex-column flex-sm-row mb-0">
              <li v-for="(item, index) of menu" class="nav-item" :key="index">
                <nuxt-link :to="'/pages/'+item.page.id" class="nav-link text-light p-0 pr-sm-3">
                  {{ item.title }}
                </nuxt-link>
              </li>
            </ul>
          </div>
          <div class="col-12 col-sm text-sm-right align-self-end">
            <!--&copy; Все права защищены - 2020-->
            Соискателей в базе: {{ count }}
          </div>
        </div>
      </div>
    </footer>
  </div>
</template>

<script>
  export default {
    computed: {
      count() {
        return this.$store.getters["clients/count"]
      },
      menu() {
        return this.$store.getters["navigation/footer"]
      }
    }
  }
</script>

<style lang="scss" scoped>
  .nav {
    .nav-link {
      padding: 2px 10px;
    }
  }
</style>
