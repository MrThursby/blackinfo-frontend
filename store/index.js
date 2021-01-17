export const actions = {
  async nuxtServerInit({dispatch}) {
    await dispatch('navigation/fetch')
    await dispatch('clients/fetchCount')
  },
}
