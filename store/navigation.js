export const state = () => ({
  menus: [],
  meta: [],
  current: {},
  navbar: [],
  footer: [],
})

export const mutations = {
  setMenus(state, menus) {
    state.menus = menus
  },
  setMeta(state, meta) {
    state.meta = meta
  },
  setCurrent(state, menu) {
    state.current = menu
  },
  setNavbar(state, menu) {
    state.navbar = menu
  },
  setFooter(state, menu) {
    state.footer = menu
  },
}

export const actions = {
  async fetch({commit}) {
    const navbar = await this.$axios.$get('/api/menus/1')
    const footer = await this.$axios.$get('/api/menus/2')

    commit('setNavbar', navbar.data.items)
    commit('setFooter', footer.data.items)
  },
  async fetchMenus({commit}) {
    commit('setMenus', [])
    const menus = await this.$axios.$get('/api/menus')

    commit('setMenus', menus.data.data)
    commit('setMeta', menus.data.meta)
  },
  async fetchCurrent({commit}, id) {
    const menu = await this.$axios.$get('/api/menus/' + id)
    commit('setCurrent', menu.data)
  },
  clearCurrent({commit}) {
    commit('setCurrent', {})
  },
}

export const getters = {
  menus: state => state.menus,
  meta: state => state.meta,
  current: state => state.current,
  navbar: state => state.navbar,
  footer: state => state.footer,
}
