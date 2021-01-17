export const state = () => ({
  clients: [],
  lastClientsResponseUrl: '',
  meta: {},
  current: {},
  count: 0,
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
  setCount(state, count) {
    state.count = count
  },
  setLastClientsResponseUrl(state, url) {
    state.lastClientsResponseUrl = url
  },
}

export const actions = {
  async fetch({commit}) {
    commit('setClients', [])
    const url = '/api/clients'
    const clients = await this.$axios.$get(url)

    commit('setLastClientsResponseUrl', url)
    commit('setClients', clients.data.data)
    commit('setMeta', clients.data.meta)
  },
  async reFetch({commit, state}) {
    commit('setClients', [])
    const clients = await this.$axios.$get(state.lastClientsResponseUrl)

    commit('setClients', clients.data.data)
    commit('setMeta', clients.data.meta)
  },
  async fetchOwns({commit}) {
    commit('setClients', [])
    const url = '/api/clients?owns=1'
    const clients = await this.$axios.$get(url)

    commit('setLastClientsResponseUrl', url)
    commit('setClients', clients.data.data)
    commit('setMeta', clients.data.meta)
  },
  async fetchQuery({commit}, query) {
    commit('setClients', [])
    const url = '/api/clients?query='+query
    const clients = await this.$axios.$get(url)

    commit('setLastClientsResponseUrl', url)
    commit('setClients', clients.data.data)
    commit('setMeta', clients.data.meta)
  },
  async fetchCurrent({commit}, id) {
    const client = await this.$axios.$get('/api/clients/'+id)
    commit('setCurrent', client.data)
  },
  async fetchCount({commit}) {
    const client = await this.$axios.$get('/api/clients/count')
    commit('setCount', client.data)
  },
  async reFetchCurrent({commit, state}) {
    const client = await this.$axios.$get('/api/clients/'+state.current.id)
    commit('setCurrent', client.data)
  },
  clearCurrent({commit}, id) {
    const client = {}
    commit('setCurrent', client.data)
  },
}

export const getters = {
  clients: state => state.clients,
  meta: state => state.meta,
  current: state => state.current,
  count: state => state.count,
}
