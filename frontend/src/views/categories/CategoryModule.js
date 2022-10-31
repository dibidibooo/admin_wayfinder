import axios from '@axios'

export default {
  namespaced: true,
  state: {},
  getters: {},
  mutations: {},
  actions: {
    fetchCategories(ctx, queryParams) {
      return new Promise((resolve, reject) => {
        axios
          .get('http://localhost:8100/api/categories', { params: queryParams })
          .then(response => resolve(response))
          .catch(error => reject(error))
      })
    },
    fetchCategory(ctx, { id }) {
      return new Promise((resolve, reject) => {
        axios
          .get(`http://localhost:8100/api/category/${id}`)
          .then(response => resolve(response))
          .catch(error => reject(error))
      })
    },
    addCategory(ctx, userData) {
      return new Promise((resolve, reject) => {
        axios
          .post('http://localhost:8100/api/category', { user: userData })
          .then(response => resolve(response))
          .catch(error => reject(error))
      })
    },
  },
}
