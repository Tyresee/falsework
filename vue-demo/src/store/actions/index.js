import fetch from '@/fetch'

export default {
  updateNumber ({ commit }, number) {
    commit('setNumber', number)
  },
  async getCms  ({ commit }) {
    const json = await fetch('http://cms.cekid.com/publish/998/newindex2017.json')
    commit('setCms', json)
  }
}
