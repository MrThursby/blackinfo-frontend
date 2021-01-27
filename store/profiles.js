export const state = () => ({
  profiles: [],
  meta: {},
  current: {},
  role: 'unchecked',
})

export const mutations = {
  setProfiles(state, profiles) {
    state.profiles = profiles
  },
  setCurrent(state, profile) {
    state.current = profile
  },
  setMeta(state, meta) {
    state.meta = meta
  },
  setRole(state, role) {
    state.role = role
  },
}

export const actions = {
  async fetch({commit, state}, page = null, role = null) {
    commit('setProfiles', [])
    if(role === null){
      role = state.role
    }
    if(page === null){
      page = 1
    }

    let params = {
      role: role,
      page: page,
    }


    let profiles = await this.$axios.$get('/api/users/', {params: params})

    commit('setProfiles', profiles.data.data)
    commit('setMeta', profiles.data.meta)
  },
  async fetchCurrent({commit}, id) {
    const user = await this.$axios.$get('/api/users/'+id)

    commit('setCurrent', user.data)
  },
  clearCurrent({commit}) {
    commit('setCurrent', {})
  },
  setCurrentRole({commit}, role) {
    commit('setRole', role)
  },
}

export const getters = {
  profiles: state => state.profiles,
  current: state => state.current,
  meta: state => state.meta,
  role: state => state.role,
}
