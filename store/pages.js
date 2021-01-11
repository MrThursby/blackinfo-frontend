export const state = () => ({
  current: {},
  main: {}
})

export const mutations = {
  setCurrent(state, page) {
    state.current = page
  },
  setMain(state, page) {
    state.current = page
  },
}

export const actions = {
  async fetchCurrent({commit}, id) {
    const page = await this.$axios.$get('/api/pages/'+id)

    commit('setCurrent', page.data)
  },
  async fetchMain({commit}) {
    const page = await this.$axios.$get('/api/pages/1')

    commit('setMain', page.data)
  },
}

export const getters = {
  current: state => state.current,
  main: state => state.main,
}
