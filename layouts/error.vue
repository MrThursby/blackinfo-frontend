<template>
  <div class="container py-5">
    <div class="row justify-content-center">
      <div class="col-xl-10 col-xxl-8">
        <h1 v-if="error.statusCode === 403">Доступ запрещён</h1>
        <p v-if="error.statusCode === 403 && $auth.user.role_name === 'unchecked'">
          Возможно потому, что ваш email не подтверждён
        </p>
        <p v-if="error.statusCode === 403 && $auth.user.role_name === 'banned'">
          Возможно потому, что ваш аккаунт заблокирован
        </p>
        <h1 v-if="error.statusCode === 404">Страница не существует</h1>
        <h1 v-if="error.statusCode === 500">Ошибка на сервере</h1>
        <p v-if="error.statusCode === 500">
          Попробуйте обновить страницу. Если ошибка осталась, зайдите позже.
        </p>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "error",
    layout: 'default',
    props: ['error']
  }
</script>

<style scoped>

</style>
