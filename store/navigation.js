export const state = () => ({
  navbar: [],
  footer: [],
})

export const mutations = {
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
}

export const getters = {
  navbar: state => state.navbar,
  footer: state => state.footer,
}
