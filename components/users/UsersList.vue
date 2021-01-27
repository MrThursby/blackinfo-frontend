<template>
  <div>
    <h1>{{ headline }}</h1>
    <div v-if="users.length === 0 && usersMeta.count !== 0">
      <Loading/>
    </div>
    <div v-if="users.length !== 0" id="users" class="accordion mb-2" role="tablist">
      <b-card v-for="(user, index) of users" :key="index" no-body>
        <b-card-header class="p-1" header-tag="header" role="tab" header-class="bg-dark">
          <b-button
            v-b-toggle="'user-'+index"
            block
            class="text-left shadow-none text-decoration-none text-light"
            variant="link"
            @click="getCurrent(user.id)"
          >
            <div class="row text-truncate">
              <div class="col-auto pr-0 d-none when-closed">
                <b-icon aria-hidden="true" font-scale="0.8" icon="caret-right-fill" shift-v="5"></b-icon>
              </div>
              <div class="col-auto pr-0 d-none when-open">
                <b-icon aria-hidden="true" font-scale="0.8" icon="caret-down-fill" shift-v="5"></b-icon>
              </div>
              <div class="col-auto">{{ user.name }}</div>
              <div class="col-auto d-none <!--d-sm-block when-closed--> text-truncate">
                {{ user.passport }}
              </div>
              <div class="col text-right">{{ user.created_at }}</div>
            </div>
          </b-button>
        </b-card-header>
        <b-collapse :id="'user-' + index" accordion="pages" role="tabpanel">
          <b-card-body>
            <b-card-text v-if="Object.keys(current).length">
              <div class="row">
                <div class="col-md-auto mb-2">
                  <span class="font-weight-bold text-light">Коммерческое название:</span> {{ current.name }}<br/>
                  <span class="font-weight-bold text-light">Название организации:</span> {{ current.organization_name }} <br/>
                  <span class="font-weight-bold text-light">ИНН:</span> {{ current.inn }} <br/>
                  <span class="font-weight-bold text-light">ОГРН / ОГРНИП:</span> {{ current.ogrn }} <br/>
                </div>
                <div class="col-md mb-2">
                  <span class="font-weight-bold text-light">Сайт организации:</span> {{ current.site }} <br/>
                  <span class="font-weight-bold text-light">Номер телефона:</span> {{ current.phone }} <br/>
                  <span class="font-weight-bold text-light">E-Mail:</span> {{ current.email }} <br/>
                </div>
              </div>
              <div class="row align-items-center">
                <div class="col-auto">
                  <button
                    v-if="user.role.name === 'unchecked'"
                    class="btn btn-sm btn-primary ml-auto mb-2"
                    @click="setRole(user.id, 'user')"
                  >
                    <b-icon
                      aria-hidden="true"
                      font-scale="0.8"
                      icon="pencil-fill"
                      shift-v="2"
                    ></b-icon>
                    <span class="ml-1">Подтвердить</span>
                  </button>
                  <button
                    v-if="user.role.name !== 'admin'"
                    class="btn btn-sm btn-primary ml-auto mb-2"
                    @click="setRole(user.id, 'admin')"
                  >
                    <b-icon
                      aria-hidden="true"
                      font-scale="0.8"
                      icon="pencil-fill"
                      shift-v="2"
                    ></b-icon>
                    <span class="ml-1">Назначить администратором</span>
                  </button>
                  <button
                    v-if="user.role.name === 'admin'"
                    class="btn btn-sm btn-primary ml-auto mb-2"
                    @click="setRole(user.id, 'user')"
                  >
                    <b-icon
                      aria-hidden="true"
                      font-scale="0.8"
                      icon="pencil-fill"
                      shift-v="2"
                    ></b-icon>
                    <span class="ml-1">Снять с должности администратора</span>
                  </button>
                  <button
                    v-if="user.role.name !== 'banned'"
                    class="btn btn-sm btn-danger ml-auto mb-2"
                    @click="setRole(user.id, 'banned')"
                  >
                    <b-icon
                      aria-hidden="true"
                      font-scale="0.8"
                      icon="pencil-fill"
                      shift-v="2"
                    ></b-icon>
                    <span class="ml-1">В черный список</span>
                  </button>
                  <button
                    v-if="user.role.name === 'banned'"
                    class="btn btn-sm btn-danger ml-auto mb-2"
                    @click="setRole(user.id, 'user')"
                  >
                    <b-icon
                      aria-hidden="true"
                      font-scale="0.8"
                      icon="pencil-fill"
                      shift-v="2"
                    ></b-icon>
                    <span class="ml-1">Убрать из черного списка</span>
                  </button>
                  <button
                    class="btn btn-sm btn-secondary ml-auto mb-2"
                  >
                    <b-icon
                      aria-hidden="true"
                      font-scale="1.1"
                      icon="box-arrow-up-right"
                    ></b-icon>
                    <span class="ml-1">Профиль</span>
                  </button>
                </div>
              </div>
            </b-card-text>
            <b-card-text v-if="!Object.keys(current).length" class="p-3">
              <Loading/>
            </b-card-text>
          </b-card-body>
        </b-collapse>
      </b-card>
    </div>
    <span v-if="usersMeta.count === 0">Список пуст</span>
    <b-pagination
      v-if="usersMeta.total > usersMeta.per_page"
      v-model="currentPage"
      :total-rows="usersMeta.total"
      :per-page="usersMeta.per_page"
      aria-controls="my-table"
      class="justify-content-center"
    ></b-pagination>
  </div>
</template>

<script>
  import Loading from "@/components/Loading";
  export default {
    name: "UsersList",
    props: {
      headline: {type: String, default: "Пользователи"}
    },
    data() {
      return {
        currentPage: 1,
      }
    },
    computed: {
      users() {
        return this.$store.getters["profiles/profiles"]
      },
      usersMeta() {
        return this.$store.getters["profiles/meta"]
      },
      current() {
        return this.$store.getters["profiles/current"]
      },
      currentRole() {
        return this.$store.getters["profiles/role"]
      },
    },
    watch: {
      currentPage: function(page) {
        this.$store.dispatch('profiles/fetch', page)
      },
      currentRole: function() {
        this.currentPage = 1
        this.$store.dispatch('profiles/fetch')
      },
    },
    methods: {
      getCurrent(id) {
        if(this.current === undefined || this.current.id !== id) {
          this.$store.dispatch("profiles/clearCurrent", id)
          this.$store.dispatch("profiles/fetchCurrent", id)
        }
      },
      setRole(id, role) {
        this.$axios.$patch('/api/users/' + id, {role: role})
        this.$store.dispatch("profiles/fetch", this.usersMeta.current_page)
      }
    },
    components: {
      Loading
    }
  }
</script>

<style lang="scss" scoped>
  .collapsed .when-closed,
  .not-collapsed .when-open {
    display: block!important;
  }
</style>
