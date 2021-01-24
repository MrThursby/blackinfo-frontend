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
            <b-card-text>Новых за последний месяц: {{ count }}</b-card-text>
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
            <b-card-text>Всего: {{ count }}</b-card-text>
            <b-card-text>Непроверенных: {{ count }}</b-card-text>
            <b-card-text>Регистраций за месяц: {{ count }}</b-card-text>
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
            <b-card-text>Посещений за месяц: {{ count }}</b-card-text>
            <b-card-text>Поисковых запросов за месяц: {{ count }}</b-card-text>
            <b-card-text>Просмотров конкретного пользователя: {{ count }}</b-card-text>
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
    async ayncData({axios}) {
      let clients = {
        monthCount: axios.$get('/api/clients/count?after=' + moment().format()),
        yearCount: axios.$get('/api/clients/count'),
      }
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
