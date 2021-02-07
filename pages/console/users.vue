<template>
  <div class="container pt-3 pb-5">
    <div class="row mb-4">
      <div class="col pb-lg-0 h-auto">
          <button class="btn mb-1 btn-primary" :class="{'active': role === 'unchecked'}" @click="setRole('unchecked')">Не проверенные</button>
          <button class="btn mb-1 btn-primary" :class="{'active': role === 'user'}" @click="setRole('user')">Пользователи</button>
          <button class="btn mb-1 btn-primary" :class="{'active': role === 'admin'}" @click="setRole('admin')">Администраторы</button>
          <button class="btn mb-1 btn-primary" :class="{'active': role === 'banned'}" @click="setRole('banned')">Черный список</button>
      </div>
      <!-- <div class="col-12 col-lg-6 h-auto">
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
      </div> -->
    </div>
    <UsersList />
  </div>
</template>

<script>
  import UsersList from "@/components/users/UsersList";
  export default {
    components: {UsersList},
    layout: 'manage',
    name: "users",
    async fetch({store, error}) {
      if (store.state.profiles.profiles.length === 0) {
        await store.dispatch("profiles/fetch").catch(e => {
          error({message: e.response.data.message, status: e.response.status})
        })
      }
    },
    computed: {
      role() {
        return this.$store.getters["profiles/role"]
      }
    },
    methods: {
      setRole(role) {
        this.$store.dispatch('profiles/setCurrentRole', role)
      }
    }
  }
</script>

<style scoped>

</style>
