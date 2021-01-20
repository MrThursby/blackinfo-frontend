export const state = () => ({
  current: {},
})

export const mutations = {
  setCurrent(state, profile) {
    state.current = profile
  },
}

export const actions = {
  async fetchCurrent({commit}, id) {
    const user = await this.$axios.$get('/api/users/'+id)

    commit('setCurrent', user.data)
  },
}

export const getters = {
  current: state => state.current,
}
