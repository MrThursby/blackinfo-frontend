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
          <button class="btn btn-info" @click="getOwns">Мои</button>
<!--          <button class="btn btn-warning" >Новые</button>-->
          <button class="btn btn-info" @click="getAll">Все</button>
        </div>
      </div>
      <div class="col-12 col-lg-6 h-auto">
        <form action="GET">
          <div class="input-group">
<!--            <div class="input-group-prepend">
              <a class="btn btn-primary" href="#">Выбрать регион</a>
            </div>-->
            <input
              aria-describedby="button-addon2"
              aria-label="Любые данные о соискателе..."
              class="form-control"
              placeholder="Любые данные о соискателе..."
              type="text"
            />
            <div class="input-group-append">
              <button
                id="button-addon2"
                class="btn btn-outline-secondary"
                type="button"
              >
                Найти
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
    <h1>Соискатели</h1>
    <div id="accordion" class="accordion mb-2">
      <b-card v-for="(client, index) of clients" :key="index" no-body>
        <b-card-header class="p-1" header-tag="header" role="tab">
          <b-button
            v-b-toggle
            :href="'#accordion-' + index"
            block
            class="text-left shadow-none text-decoration-none text-dark"
            variant="link"
            @click="getCurrent(client.id)"
          >
            <div class="row text-truncate">
              <div class="col-auto pr-0 when-closed">
                <b-icon aria-hidden="true" font-scale="0.8" icon="caret-right-fill" shift-v="5"></b-icon>
              </div>
              <div class="col-auto pr-0 when-open">
                <b-icon aria-hidden="true" font-scale="0.8" icon="caret-down-fill" shift-v="5"></b-icon>
              </div>
              <div class="col-auto">{{ client.last_name }} {{ client.first_name }} {{ client.middle_name }}</div>
              <div class="col-auto d-none d-sm-block when-closed text-truncate">
                {{ client.passport }}
              </div>
              <div class="col text-right">{{ client.created_at }}</div>
            </div>
          </b-button>
        </b-card-header>
        <b-collapse :id="'accordion-' + index" accordion="accordion" role="tabpanel">
          <b-card-body>
            <b-card-text v-if="current">
              <div class="row">
                <div class="col-md-auto mb-2">
                  <span class="font-weight-bold">Имя:</span> {{ current.first_name }}<br/>
                  <span class="font-weight-bold">Фамилия:</span> {{ current.last_name }} <br/>
                  <span class="font-weight-bold">Отчество:</span> {{ current.middle_name }} <br/>
                  <span class="font-weight-bold">Телефон:</span> {{ current.phone }} <br/>
                </div>
                <div class="col-md mb-2">
                  <span class="font-weight-bold">Серия и номер паспорта:</span>
                  {{ current.passport }} <br/>
                  <span class="font-weight-bold">Кем выдан:</span> {{ current.passport_issued_by }} <br/>
                  <span class="font-weight-bold">Когда выдан:</span> {{ current.passport_issued_date }} <br/>
                </div>
              </div>
              <span class="font-weight-bold">Нарушение:</span><br/>
              <p class="mb-2">
                {{ current.violation }}
              </p>
              <span class="font-weight-bold" v-if="!!current.violation_status">Ущерб возмещён</span><br/>
              <span class="font-weight-bold" v-if="!current.violation_status">Ущерб не возмещён</span><br/>
              <div class="row align-items-center">
                <div class="col">
                  <span class="font-weight-bold">Автор: </span>
                  <a href="#">{{ client.author.name }}</a>
                </div>
                <div class="col-auto">
                  <button
                    v-b-modal.clients-edit
                    class="btn btn-sm btn-primary ml-auto"
                    href="#"
                    v-if="!!client.editable"
                  >
                    <b-icon
                      aria-hidden="true"
                      font-scale="0.8"
                      icon="pencil-fill"
                      shift-v="5"
                    ></b-icon>
                    <span class="ml-1">Редактировать</span>
                  </button>
                </div>
              </div>
            </b-card-text>
          </b-card-body>
        </b-collapse>
      </b-card>
    </div>
    <b-modal id="clients-edit" size="lg" title="BootstrapVue">
      <EditForm/>
    </b-modal>
    <span>Уточните критерии запроса, для уменьшения числа результатов {{  }}</span>
  </div>
</template>

<script>
import EditForm from '~/components/clients/EditForm'
//import { mapGetters } from 'vuex'
export default {
  middleware: 'auth',
  async fetch({store}) {
    // if(store.getters["clients/clients"] === []) {
    await store.dispatch("clients/fetch")
    // }
  },
  computed: {
    clients() {
      return this.$store.getters["clients/clients"]
    },
    current() {
      return this.$store.getters["clients/current"]
    },
  },
  methods: {
    getAll() {
      this.$store.dispatch("clients/fetch")
    },
    getOwns() {
      this.$store.dispatch("clients/fetchOwns")
    },
    getCurrent(id) {
      this.$store.dispatch("clients/fetchCurrent", id)
    },
  },
  components: {
    EditForm
  }
}
</script>

<style lang="scss" scoped>
.collapsed .when-open,
.not-collapsed .when-closed {
  display: none;
}
</style>
