<template>
  <div class="container pb-5 pt-3">
    <div class="row mb-4">
      <div class="col pb-lg-0 pb-3 h-auto">
        <nuxt-link class="btn btn-success" to="/clients/create">
          <span class="d-block d-sm-none"
          ><b-icon
            aria-hidden="true"
            font-scale="1"
            icon="plus-circle"
            shift-v="1"
          ></b-icon
          ></span>
          <span class="d-none d-sm-block">Добавить соискателя</span>
        </nuxt-link>
      </div>
      <div class="col-auto pb-lg-0 pb-3 h-auto">
        <div class="btn-group">
          <button class="btn btn-primary" @click="getOwns">Мои</button>
          <!--          <button class="btn btn-warning" >Новые</button>-->
          <button class="btn btn-primary" @click="getAll">Все</button>
        </div>
      </div>
      <div class="col-12 col-lg-6 h-auto">
        <form @submit.prevent="getQuery">
          <div class="input-group">
            <!--            <div class="input-group-prepend">
                          <a class="btn btn-primary" href="#">Выбрать регион</a>
                        </div>-->
            <input
              v-model="query"
              aria-describedby="button-addon2"
              aria-label="Любые данные о соискателе..."
              class="form-control"
              placeholder="Любые данные о соискателе..."
              type="text"
            />
            <div class="input-group-append">
              <button
                id="button-addon2"
                class="btn btn-primary"
                type="submit"
              >
                Найти
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
    <ClientsList/>
  </div>
</template>

<script>
  import EditForm from '~/components/clients/EditForm'
  import Loading from "~/components/Loading";
  import ClientsList from "~/components/clients/ClientsList";
  // import { mapGetters } from 'vuex'
  export default {
    layout: 'manage',
    middleware: 'auth',
    async fetch({store, error}) {
      if (store.state.clients.clients.length === 0) {
        await store.dispatch("clients/fetch").catch(e => {
          error({message: e.response.data.message, status: e.response.status})
        })
      }
    },
    data: () => ({
      query: '',
    }),
    methods: {
      getAll() {
        this.$store.dispatch("clients/fetch")
      },
      getOwns() {
        this.$store.dispatch("clients/fetchOwns")
      },
      getQuery() {
        this.$store.dispatch("clients/fetchQuery", this.query)
      },
    },
    components: {
      Loading,
      EditForm,
      ClientsList
    }
  }
</script>

