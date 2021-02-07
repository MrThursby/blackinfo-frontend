<template>
  <div>
    <h1>{{ headline }}</h1>
    <div v-if="menus.length === 0 && menusMeta.count !== 0">
      <Loading/>
    </div>
    <div v-if="menus.length !== 0" id="menus" class="accordion mb-2" role="tablist">
      <b-card v-for="(menu, index) of menus" :key="index" no-body>
        <b-card-header class="p-1" header-tag="header" role="tab" header-class="bg-dark">
          <b-button
            v-b-toggle="'menu-'+index"
            block
            class="text-left shadow-none text-decoration-none text-light"
            variant="link"
            @click="getCurrent(menu.id)"
          >
            <div class="row text-truncate">
              <div class="col-auto pr-0 d-none when-closed">
                <b-icon aria-hidden="true" font-scale="0.8" icon="caret-right-fill" shift-v="5"></b-icon>
              </div>
              <div class="col-auto pr-0 d-none when-open">
                <b-icon aria-hidden="true" font-scale="0.8" icon="caret-down-fill" shift-v="5"></b-icon>
              </div>
              <div class="col text-truncate">{{ menu.title }}</div>
            </div>
          </b-button>
        </b-card-header>
        <b-collapse :id="'menu-' + index" accordion="pages" role="tabpanel">
          <b-card-body>
            <b-card-text v-if="Object.keys(current).length > 0">
              <div v-for="(item, index) of current.items" :key="'menu-item' + index" class="row">
                <b-form class="col">
                  <b-input-group class="mb-1">
                    <template #prepend>
                      <b-input-group-text>{{ index + 1 }}</b-input-group-text>
                    </template>
                    <b-input-group-text class="flex-fill bg-dark text-white">{{ item.title }}</b-input-group-text>
                    <template #append>
                      <b-button
                        @click="itemIndex = index"
                        v-b-modal.items-edit
                        variant="success">
                        <b-icon
                          aria-hidden="true"
                          font-scale="1.1"
                          icon="pencil"
                          shift-v="-1"/>
                      </b-button>
                    </template>
                  </b-input-group>
                </b-form>
              </div>
              <div class="row">
                <div class="col text-right">
                  <b-button v-b-modal.items-create variant="success">
                    <b-icon
                      aria-hidden="true"
                      font-scale="1.1"
                      icon="plus-circle"
                      shift-v="1"/>
                  </b-button>
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
    <b-modal id="items-edit" size="lg" title="BlackInfo" class="pl-0" hide-footer>
      <ItemEditForm v-if="current.items !== undefined"
                    :item="current.items[itemIndex]"
                    :menu_id="current.id"/>
    </b-modal>
    <b-modal id="items-create" size="lg" title="BlackInfo" class="pl-0" hide-footer>
      <ItemCreateForm :menu_id="current.id"/>
    </b-modal>
    <span v-if="menusMeta.count === 0">Список пуст</span>
    <b-pagination
      v-if="menusMeta.total > menusMeta.per_page"
      v-model="currentPage"
      :total-rows="menusMeta.total"
      :per-page="menusMeta.per_page"
      aria-controls="my-table"
      class="justify-content-center"
    ></b-pagination>
  </div>
</template>

<script>
  import Loading from "@/components/Loading";
  import ItemEditForm from "@/components/navigation/ItemEditForm";
  import ItemCreateForm from "@/components/navigation/ItemCreateForm";

  export default {
    name: "MenusList",
    props: {
      headline: {type: String, default: "Навигация"}
    },
    data() {
      return {
        currentPage: 1,
        itemIndex: 1,
      }
    },
    computed: {
      menus() {
        return this.$store.getters["navigation/menus"]
      },
      menusMeta() {
        return this.$store.getters["navigation/meta"]
      },
      current() {
        return this.$store.getters["navigation/current"]
      },
    },
    methods: {
      getCurrent(id) {
        this.$store.dispatch("navigation/clearCurrent", id)
        this.$store.dispatch("navigation/fetchCurrent", id)
      }
    },
    components: {
      ItemCreateForm, ItemEditForm, Loading
    }
  }
</script>

<style lang="scss" scoped>
  .collapsed .when-closed,
  .not-collapsed .when-open {
    display: block !important;
  }
</style>

