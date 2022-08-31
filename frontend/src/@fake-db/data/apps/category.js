import mock from '@/@fake-db/mock'
import { paginateArray, sortCompare } from '@/@fake-db/utils'
import CategoryDataService from "../../../services/CategoryDataService"

let data = ''

CategoryDataService.getAll()
  .then(response => {
    data = response.data
  })
  .catch(e => {
    console.log(e);
  });

// ------------------------------------------------
// GET: Return Categories
// ------------------------------------------------
mock.onGet('http://localhost:8081/api/categories').reply(config => {
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
    category =>
      /* eslint-disable operator-linebreak, implicit-arrow-linebreak */
      category.title.toLowerCase().includes(queryLowered)
  )
  /* eslint-enable  */

  const sortedData = filteredData.sort(sortCompare(sortBy))
  if (sortDesc) sortedData.reverse()

  return [
    200,
    {
      categories: paginateArray(sortedData, perPage, page),
      total: filteredData.length,
    },
  ]
})

// ------------------------------------------------
// POST: Add new user
// ------------------------------------------------
// mock.onPost('/apps/user/users').reply(config => {
//   // Get event from post data
//   const { user } = JSON.parse(config.data)

//   // Assign Status
//   user.status = 'active'

//   const { length } = data.users
//   let lastIndex = 0
//   if (length) {
//     lastIndex = data.users[length - 1].id
//   }
//   user.id = lastIndex + 1

//   data.users.push(user)

//   return [201, { user }]
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
