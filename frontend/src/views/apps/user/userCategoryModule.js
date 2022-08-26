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
          .get('http://localhost:8081/api/categories', { params: queryParams })
          .then(response => resolve(response))
          .catch(error => reject(error))
      })
    },
    fetchCategory(ctx, { id }) {
      return new Promise((resolve, reject) => {
        axios
          .get(`http://localhost:8081/api/category/${id}`)
          .then(response => resolve(response))
          .catch(error => reject(error))
      })
    },
    addUser(ctx, userData) {
      return new Promise((resolve, reject) => {
        axios
          .post('/apps/user/users', { user: userData })
          .then(response => resolve(response))
          .catch(error => reject(error))
      })
    },
  },
}
