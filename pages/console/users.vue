<template>
  <div class="container py-5">
    <div class="row mb-4">
      <div class="col pb-lg-0 pb-3 h-auto">
        <div class="btn-group">
          <button class="btn btn-primary">Не проверенные</button>
          <button class="btn btn-primary">Пользователи</button>
          <button class="btn btn-primary">Администраторы</button>
        </div>
      </div>
      <div class="col-12 col-lg-6 h-auto">
        <form>
          <div class="input-group">
            <input
              aria-describedby="button-addon2"
              aria-label="Данные о пользователе..."
              class="form-control"
              placeholder="Данные о пользователе..."
              type="text"
            />
            <div class="input-group-append">
              <button
                id="button-addon2"
                class="btn btn-primary"
                type="submit"
              >Найти</button>
            </div>
          </div>
        </form>
      </div>
    </div>
    <h1>Пользователи</h1>
  </div>
</template>

<script>
  export default {
    layout: 'manage',
    name: "users"
  }
</script>

<style scoped>

</style>
