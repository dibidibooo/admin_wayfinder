import mock from '@/@fake-db/mock'
import { paginateArray, sortCompare } from '@/@fake-db/utils'
import StoreDataService from "../../../services/StoreDataService"

let data = ''

StoreDataService.getAll()
  .then(response => {
    data = response.data
  })

// ------------------------------------------------
// GET: Return Categories
// ------------------------------------------------

mock.onGet('http://localhost:8100/api/stores').reply(config => {
  // eslint-disable-next-line object-curly-newline
  const {
    q = '',
    perPage = 10,
    page = 1,
    sortBy = 'id',
    sortDesc = false
  } = config.params
  /* eslint-enable */

  const queryLowered = q.toLowerCase()
  const filteredData = data.filter(
    store =>
      /* eslint-disable operator-linebreak, implicit-arrow-linebreak */
      (store.title.toLowerCase().includes(queryLowered) || store.description.toLowerCase().includes(queryLowered))
  )
  /* eslint-enable  */

  const sortedData = filteredData.sort(sortCompare(sortBy))
  if (sortDesc) sortedData.reverse()

  return [
    200,
    {
      stores: paginateArray(sortedData, perPage, page),
      total: filteredData.length,
    },
  ]
})

// ------------------------------------------------
// POST: Add new user
// ------------------------------------------------
// mock.onPost('http://localhost:8100/api/store').reply(config => {
//   // Get event from post data
//   const { new_store } = JSON.parse(config.data)

//   const { length } = data.stores
//   let lastIndex = 0
//   if (length) {
//     lastIndex = data.stores[length - 1].id
//   }
//   new_store.id = lastIndex + 1

//   data.stores.push(new_store)

//   return [201, { new_store }]
// })

// ------------------------------------------------
// GET: Return Single User
// ------------------------------------------------
// mock.onGet(/\/apps\/user\/users\/\d+/).reply(config => {
//   // Get event id from URL
//   let userId = config.url.substring(config.url.lastIndexOf('/') + 1)

//   // Convert Id to number
//   userId = Number(userId)

//   const userIndex = data.users.findIndex(e => e.id === userId)
//   const user = data.users[userIndex]

//   if (user) return [200, user]
//   return [404]
// })

// mock.onDelete(/\/apps\/stores\/store\/\d+/).reply(config => {
//   console.log('276')
//   let storeId = config.url.substring(config.url.lastIndexOf('/') + 1)
//   storeId = Number(storeId)
//   console.log('Store ID:', storeId);

//   StoreDataService.delete(storeId)
//     .then(response => {
//       console.log(response.data);
//     })
//     .catch(e => {
//       console.log(e);
//     });
// })