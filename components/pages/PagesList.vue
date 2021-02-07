<template>
  <div>
    <div class="row align-items-center">
      <div class="col">
        <h1>{{ headline }}</h1>
      </div>
      <div class="col-auto">
        <button v-b-modal.pages-create class="btn btn-success">
          <span class="d-none d-md-block">Добавить</span>
          <span class="d-block d-md-none">
            <b-icon
              aria-hidden="true"
              font-scale="1"
              icon="plus-circle"
              shift-v="-1" />
          </span>
        </button>
      </div>
    </div>
    <div v-if="pages.length === 0 && pagesMeta.count !== 0">
      <Loading/>
    </div>
    <div v-if="pages.length !== 0" id="pages" class="accordion mb-2" role="tablist">
      <b-card v-for="(page, index) of pages" :key="index" no-body>
        <b-card-header class="p-1" header-tag="header" role="tab" header-class="bg-dark">
          <b-button
            v-b-toggle="'page-'+index"
            block
            class="text-left shadow-none text-decoration-none text-light"
            variant="link"
            @click="getCurrent(page.id)"
          >
            <div class="row text-truncate">
              <div class="col-auto pr-0 d-none when-closed">
                <b-icon aria-hidden="true" font-scale="0.8" icon="caret-right-fill" shift-v="5"></b-icon>
              </div>
              <div class="col-auto pr-0 d-none when-open">
                <b-icon aria-hidden="true" font-scale="0.8" icon="caret-down-fill" shift-v="5"></b-icon>
              </div>
              <div class="col pr-0 text-truncate">{{ page.title }}</div>
              <div class="col-auto">{{ $moment.utc(page.created_at).format('LL') }}</div>
            </div>
          </b-button>
        </b-card-header>
        <b-collapse :id="'page-' + index" accordion="pages" role="tabpanel">
          <b-card-body>
            <b-card-text v-if="Object.keys(current).length > 0">
              <p>{{ current.content.substr(0, 500) }}...</p>
              <div class="row align-items-center">
                <div class="col-auto">
                  <a :href="'/pages/' + page.id"
                     target="_blank"
                     class="btn btn-sm btn-secondary ml-auto mb-2">
                    <b-icon
                      aria-hidden="true"
                      font-scale="1.1"
                      icon="box-arrow-up-right"
                    ></b-icon>
                    <span class="ml-1">Открыть</span>
                  </a>
                  <button
                    v-b-modal.pages-edit
                    class="btn btn-sm btn-secondary ml-auto mb-2"
                  >
                    <b-icon
                      aria-hidden="true"
                      font-scale="1.1"
                      icon="pencil"
                    ></b-icon>
                    <span class="ml-1">Редактировать</span>
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
    <b-modal id="pages-edit" size="lg" title="BlackInfo" class="pl-0" hide-footer>
       <EditForm :page="current"/>
    </b-modal>
    <b-modal id="pages-create" size="lg" title="BlackInfo" class="pl-0" hide-footer>
      <CreateForm />
    </b-modal>
    <span v-if="pagesMeta.count === 0">Список пуст</span>
    <b-pagination
      v-if="pagesMeta.total > pagesMeta.per_page"
      v-model="currentPage"
      :total-rows="pagesMeta.total"
      :per-page="pagesMeta.per_page"
      aria-controls="my-table"
      class="justify-content-center"
    ></b-pagination>
  </div>
</template>

<script>
  import Loading from "@/components/Loading"
  import EditForm from "@/components/pages/EditForm"
  import CreateForm from "@/components/pages/CreateForm";

  export default {
    name: "PagesList",
    props: {
      headline: {type: String, default: "Страницы"}
    },
    data() {
      return {
        currentPage: 1,
      }
    },
    computed: {
      pages() {
        return this.$store.getters["pages/pages"]
      },
      pagesMeta() {
        return this.$store.getters["pages/meta"]
      },
      current() {
        return this.$store.getters["pages/current"]
      },
    },
    watch: {
      currentPage: function(page) {
        this.$store.dispatch('pages/fetch', page)
      },
    },
    methods: {
      getCurrent(id) {
        if(this.current === undefined || this.current.id !== id) {
          this.$store.dispatch("pages/clearCurrent", id)
          this.$store.dispatch("pages/fetchCurrent", id)
        }
      },
    },
    components: {
      CreateForm,
      EditForm,
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

