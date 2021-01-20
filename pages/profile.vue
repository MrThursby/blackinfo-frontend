<template>
  <div class="container py-3">
    <div id="profile" role="tablist">
      <b-card no-body class="mb-1 overflow-hidden">
        <b-card-header class="profile-card-header px-3 py-0 text-white" role="tab">
          <div class="row py-3 align-items-center flex-md-row-reverse justify-content-center justify-content-md-between"
               style="margin-left: -1rem; margin-right: -1rem; background:rgba(0,0,0,0.4);">
            <div class="col-auto">
              <div class="rounded-lg overflow-hidden" style="background: rgba(0,0,0,0.3);">
                <img width="150" height="150" src="~/assets/img/user.png" alt="">
              </div>
            </div>
            <div class="col-12 col-md-auto ml-md-5 mt-3 mt-md-0">
              <a v-if="$auth.user.about !== null" role="button" v-b-toggle.profile-info
                 class="row cursor-pointer justify-content-center text-decoration-none text-light align-items-center">
                <div class="h1 col-auto mb-0 pr-0">{{ $auth.user.name }}</div>
                <div class="col-auto pl-2">
                  <b-icon v-if="profileOpened === false" aria-hidden="true" font-scale="0.8"
                          icon="caret-right-fill"></b-icon>
                  <b-icon v-if="profileOpened === true" aria-hidden="true" font-scale="0.8"
                          icon="caret-down-fill"></b-icon>
                </div>
              </a>
              <div v-if="$auth.user.about === null" class="h1 text-light col mb-0 pr-0">{{ $auth.user.name }}</div>
              <div class="text-center text-md-left">{{ $auth.user.role }}</div>
            </div>
          </div>
        </b-card-header>
        <b-collapse v-model="profileOpened" id="profile-info" accordion="profile" role="tabpanel">
          <b-card-body v-if="$auth.user.about !== null">
            <b-card-text v-html="$md.render($auth.user.about)"></b-card-text>
          </b-card-body>
        </b-collapse>
      </b-card>
    </div>
    <div class="mt-4">
      <ClientsList v-if="$auth.user.email_verified_at !== null" headline="Мои соискатели"/>
    </div>
  </div>
</template>

<script>
  import ClientsList from "~/components/clients/ClientsList";

  export default {
    name: "profile",
    middleware: 'auth',
    async fetch({store}) {
      await store.dispatch("clients/fetchOwns")
    },
    data() {
      return {
        profileOpened: false,
      }
    },
    components: {
      ClientsList
    }
  }
</script>

<style scoped>
  .profile-card-header {
    background: url("~assets/img/user-background.png") center center;
    background-size: cover;
  }

  .collapsed .when-closed,
  .not-collapsed .when-open {
    display: inline !important;
  }
</style>
