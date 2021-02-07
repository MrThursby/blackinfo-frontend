<template>
  <footer class="bg-dark text-light py-4">
    <div class="container">
      <div class="row">
        <div class="col-auto pb-3 pb-md-0">
          <h5>BlackInfo</h5>
          <ul class="nav flex-column flex-sm-row mb-3">
            <li v-for="(item, index) of menu" class="nav-item" :key="index">
              <nuxt-link :to="'/pages/'+item.id" class="nav-link text-light p-0 pr-sm-3">
                {{ item.title }}
              </nuxt-link>
            </li>
          </ul>
          <span class="text-white">Не является публичной офертой</span>
        </div>
        <div class="col-12 col-sm text-md-right align-self-end">
          <!--&copy; Все права защищены - 2020-->
          Соискателей в базе: {{ count }}
        </div>
      </div>
    </div>
  </footer>
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
