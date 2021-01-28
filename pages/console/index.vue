<template>
  <div class="container py-5">
    <h1>Консоль</h1>
    <div class="row">
      <div class="col-md-4">
        <b-card no-body>
          <b-card-header class="text-center">
            Соискатели
          </b-card-header>
          <b-card-body>
            <b-card-text>Всего: {{ count }}</b-card-text>
            <b-card-text>За месяц: {{ clients.monthCount }}</b-card-text>
            <b-card-text>За год: {{ clients.yearCount }}</b-card-text>
            <b-btn block variant="success">Управление -></b-btn>
          </b-card-body>
        </b-card>
      </div>
      <div class="col-md-4">
        <b-card no-body>
          <b-card-header class="text-center">
            Пользователи
          </b-card-header>
          <b-card-body>
            <b-card-text>Всего: {{ users.count }}</b-card-text>
            <b-card-text>Непроверенных: {{ users.uncheckedCount }}</b-card-text>
            <b-card-text>Регистраций за месяц: {{ users.monthCount }}</b-card-text>
            <b-btn block variant="success">Управление -></b-btn>
          </b-card-body>
        </b-card>
      </div>
      <div class="col-md-4">
        <b-card no-body>
          <b-card-header class="text-center">
            Статистика
          </b-card-header>
          <b-card-body>
            <b-card-text>Посещений за месяц: *</b-card-text>
            <b-card-text>Поисковых запросов за месяц: *</b-card-text>
            <b-card-text>Просмотров конкретного пользователя: *</b-card-text>
            <b-alert :show="true" variant="warning" class="mb-0">Счётчик посещений не подключен</b-alert>
          </b-card-body>
        </b-card>
      </div>
    </div>
  </div>
</template>

<script>
  import moment from 'moment'
  export default {
    layout: "manage",
    name: "console",
    async asyncData({ $axios }) {
      let lastMonthDate = new Date(Date.now() - new Date(30 * 24 * 3600 * 1000))
      lastMonthDate = ('0' + lastMonthDate.getDate()).slice(-2) + '.' + ('0' + (lastMonthDate.getMonth() + + 1)).slice(-2) + '.' + lastMonthDate.getFullYear()
      let lastYearDate = new Date(Date.now() - new Date(2 * 365 * 24 * 3600 * 1000))
      lastYearDate = ('0' + lastYearDate.getDate()).slice(-2) + '.' + ('0' + (lastYearDate.getMonth() + + 1)).slice(-2) + '.' + lastYearDate.getFullYear()
      let clients = {
        monthCount: (await $axios.$get('/api/clients/count?after=' + lastMonthDate)).data,
        yearCount: (await $axios.$get('/api/clients/count?after=' + lastYearDate)).data,
      }
      let users = {
        count: (await $axios.$get('/api/users/count')).data,
        uncheckedCount: (await $axios.$get('/api/users/count?role=unchecked')).data,
        monthCount: (await $axios.$get('/api/users/count?after=' + lastMonthDate)).data,
      }
      return {clients, users}
    },
    computed: {
      count() {
        return this.$store.getters["clients/count"]
      },
    },
  }
</script>

<style scoped>

</style>
