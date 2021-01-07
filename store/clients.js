export const state = () => ({
  clients: [],
  meta: {},
  current: {},
})

export const mutations = {
  setClients(state, clients) {
    state.clients = clients
  },
  setMeta(state, meta) {
    state.meta = meta
  },
  setCurrent(state, client) {
    state.current = client
  },
}

export const actions = {
  async fetch({commit}) {
    const clients = await this.$axios.$get('/api/clients')

    commit('setClients', clients.data.data)
    commit('setMeta', clients.data.meta)
  },
  async fetchOwns({commit}) {
    const clients = await this.$axios.$get('/api/clients?owns=1')

    commit('setClients', clients.data.data)
    commit('setMeta', clients.data.meta)
  },
  async fetchCurrent({commit}, id) {
    const client = await this.$axios.$get('/api/clients/'+id)
    commit('setCurrent', client.data)
  },
}

export const getters = {
  clients: state => state.clients,
  meta: state => state.meta,
  current: state => state.current,
}
