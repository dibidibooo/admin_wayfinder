import mock from '@/@fake-db/mock'
import { paginateArray, sortCompare } from '@/@fake-db/utils'
// import CategoryDataService from "../../../services/CategoryDataService"


let data = [
  {
      "id": 18,
      "title": "LaCoste",
      "description": "vuvuzela",
      "store_hours": "09.00 - 21.00",
      "image": {
          "type": "Buffer",
          "data": [
              115,
              119,
              111,
              111,
              115,
              104,
              45,
              108,
              111,
              103,
              111,
              45,
              98,
              108,
              97,
              99,
              107,
              46,
              106,
              112,
              101,
              103
          ]
      },
      "createdAt": "2022-08-23T11:34:05.245Z",
      "updatedAt": "2022-08-25T04:19:14.487Z",
      "categoryId": 12,
      "category": {
          "id": 12,
          "title": "Accessories",
          "createdAt": "2022-08-23T10:42:22.026Z",
          "updatedAt": "2022-08-23T10:42:22.026Z"
      }
  },
  {
      "id": 17,
      "title": "Tommy Hilfiger",
      "description": "tommy",
      "store_hours": "10.00 - 22.00",
      "image": {
          "type": "Buffer",
          "data": [
              73,
              77,
              71,
              95,
              55,
              56,
              54,
              54,
              95,
              115,
              113,
              114,
              46,
              106,
              112,
              103
          ]
      },
      "createdAt": "2022-08-23T10:59:49.352Z",
      "updatedAt": "2022-08-25T04:19:21.059Z",
      "categoryId": 10,
      "category": {
          "id": 10,
          "title": "Electronics",
          "createdAt": "2022-08-19T12:05:57.352Z",
          "updatedAt": "2022-08-23T10:41:54.747Z"
      }
  },
  {
      "id": 7,
      "title": "nike",
      "description": "nike",
      "store_hours": "nike",
      "image": {
          "type": "Buffer",
          "data": [
              115,
              119,
              111,
              111,
              115,
              104,
              45,
              108,
              111,
              103,
              111,
              45,
              98,
              108,
              97,
              99,
              107,
              46,
              106,
              112,
              101,
              103
          ]
      },
      "createdAt": "2022-08-18T09:07:34.436Z",
      "updatedAt": "2022-08-18T09:07:34.436Z",
      "categoryId": null,
      "category": null
  }
]

// ------------------------------------------------
// GET: Return Categories
// ------------------------------------------------
mock.onGet('http://localhost:8081/api/stores').reply(config => {
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