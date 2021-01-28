export const state = () => ({
  pages: {},
  meta: {},
  current: {},
  main: {},
})

export const mutations = {
  setPages(state, pages) {
    state.pages = pages
  },
  setMeta(state, meta) {
    state.meta = meta
  },
  setCurrent(state, page) {
    state.current = page
  },
  setMain(state, page) {
    state.main = page
  },
}

export const actions = {
  async fetch({commit}, id = 1) {
    commit('setPages', [])
    const pages = await this.$axios.$get('/api/pages?page=' + id)

    commit('setMeta', pages.data.meta)
    commit('setPages', pages.data.data)
  },
  async fetchCurrent({commit}, id) {
    const page = await this.$axios.$get('/api/pages/'+id)

    commit('setCurrent', page.data)
  },
  clearCurrent({commit}) {
    commit('setCurrent', {})
  },
  async fetchMain({commit}) {
    const page = await this.$axios.$get('/api/pages/1')

    commit('setMain', page.data)
  },
}

export const getters = {
  pages: state => state.pages,
  meta: state => state.meta,
  current: state => state.current,
  main: state => state.main,
}
