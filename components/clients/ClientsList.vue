<template>
  <div class="">
    <h1>{{ headline }}</h1>
    <div v-if="clients.length === 0 && clientsMeta.count !== 0">
      <Loading/>
    </div>
    <div v-if="clients.length !== 0" id="clients" class="accordion mb-2" role="tablist">
      <b-card v-for="(client, index) of clients" :key="index" no-body>
        <b-card-header class="p-1" header-tag="header" role="tab" header-class="bg-dark">
          <b-button
            v-b-toggle="'clients-'+index"
            block
            class="text-left shadow-none text-decoration-none text-light"
            variant="link"
            @click="getCurrent(client.id)"
          >
            <div class="row text-truncate">
              <div class="col-auto pr-0 d-none when-closed">
                <b-icon aria-hidden="true" font-scale="0.8" icon="caret-right-fill" shift-v="5"></b-icon>
              </div>
              <div class="col-auto pr-0 d-none when-open">
                <b-icon aria-hidden="true" font-scale="0.8" icon="caret-down-fill" shift-v="5"></b-icon>
              </div>
              <div class="col-auto">{{ client.last_name }} {{ client.first_name }} {{ client.middle_name }}</div>
              <div class="col-auto d-none <!--d-sm-block when-closed--> text-truncate">
                {{ client.passport }}
              </div>
              <div class="col text-right">{{ client.created_at }}</div>
            </div>
          </b-button>
        </b-card-header>
        <b-collapse :id="'clients-' + index" accordion="clients" role="tabpanel">
          <b-card-body>
            <b-card-text v-if="current">
              <div class="row">
                <div class="col-md-auto mb-2">
                  <span class="font-weight-bold text-light">Имя:</span> {{ current.first_name }}<br/>
                  <span class="font-weight-bold text-light">Фамилия:</span> {{ current.last_name }} <br/>
                  <span class="font-weight-bold text-light">Отчество:</span> {{ current.middle_name }} <br/>
                  <span class="font-weight-bold text-light">Дата рождения:</span> {{ current.date_of_birth }} <br/>
                </div>
                <div class="col-md mb-2">
                  <span class="font-weight-bold text-light">Серия и номер паспорта:</span> {{ current.passport }} <br/>
                  <span class="font-weight-bold text-light">Кем выдан:</span> {{ current.passport_issued_by }} <br/>
                  <span class="font-weight-bold text-light">Когда выдан:</span> {{ current.passport_issued_date }} <br/>
                  <span class="font-weight-bold text-light">Телефон:</span> {{ current.phone }} <br/>
                </div>
              </div>
              <span class="font-weight-bold text-light">Нарушение:</span><br/>
              <p class="mb-2">
                {{ current.violation }}
              </p>
              <span class="font-weight-bold" v-if="!!current.violation_status">Ущерб возмещён</span>
              <span class="font-weight-bold" v-if="!current.violation_status">Ущерб не возмещён</span><br/>
              <div class="row align-items-center">
                <div class="col">
                  <span class="font-weight-bold text-light">Автор: </span>
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
            <b-card-text v-if="!current" class="p-3">
              <Loading/>
            </b-card-text>
          </b-card-body>
        </b-collapse>
      </b-card>
    </div>
    <b-modal id="clients-edit" size="lg" title="BlackInfo" class="pl-0" hide-footer>
      <EditForm :client="current"/>
    </b-modal>
    <span v-if="clientsMeta.count === 0">Список пуст</span>
    <span v-if="clientsMeta.count !== 0 && clients.length !== 0">Уточните критерии запроса, для уменьшения числа результатов</span>
  </div>
</template>

<script>
  import Loading from "~/components/Loading";
  import EditForm from "~/components/clients/EditForm";
  export default {
    name: "ClientsList",
    props: {
      headline: {type: String, default: "Соискатели"}
    },
    computed: {
      clients() {
        return this.$store.getters["clients/clients"]
      },
      clientsMeta() {
        return this.$store.getters["clients/meta"]
      },
      current() {
        return this.$store.getters["clients/current"]
      },
    },
    methods: {
      getCurrent(id) {
        if(this.current === undefined || this.current.id !== id) {
          this.$store.dispatch("clients/clearCurrent", id)
          this.$store.dispatch("clients/fetchCurrent", id)
        }
      },
    },
    components: {
      Loading, EditForm
    }
  }
</script>

<style lang="scss" scoped>
  .collapsed .when-closed,
  .not-collapsed .when-open {
    display: block!important;
  }
</style>
