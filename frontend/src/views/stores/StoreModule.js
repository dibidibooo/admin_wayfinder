import axios from '@axios'

export default {
  namespaced: true,
  state: {},
  getters: {},
  mutations: {},
  actions: {
    fetchStores(ctx, queryParams) {
      return new Promise((resolve, reject) => {
        axios
          .get('http://localhost:8081/api/stores', { params: queryParams })
          .then(response => resolve(response))
          .catch(error => reject(error))
      })
    },
    fetchStore(ctx, { id }) {
      return new Promise((resolve, reject) => {
        axios
          .get(`http://localhost:8081/api/store/${id}`)
          .then(response => resolve(response))
          .catch(error => reject(error))
      })
    },
    addStore(ctx, storeData) {
      return new Promise((resolve, reject) => {
        axios
          .post('http://localhost:8081/api/store', { store: storeData })
          .then(response => resolve(response))
          .catch(error => reject(error))
      })
    },
    deleteStore(ctx, { id }) {
      return new Promise((resolve, reject) => {
        axios
          .delete(`http://localhost:8081/api/store/${id}`)
          .then(response => resolve(response))
          .catch(error => reject(error))
      })
    }
  },
}
