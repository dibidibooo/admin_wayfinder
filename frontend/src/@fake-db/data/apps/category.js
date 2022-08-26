import mock from '@/@fake-db/mock'
import { paginateArray, sortCompare } from '@/@fake-db/utils'
import CategoryDataService from "../../../services/CategoryDataService"


let data = [
  {
    "id": 12,
    "title": "Accessories",
    "createdAt": "2022-08-23T10:42:22.026Z",
    "updatedAt": "2022-08-23T10:42:22.026Z",
    "stores": [
      {
        "id": 18,
        "title": "LaCoste",
        "description": "LaCoste",
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
        "categoryId": 12
      }
    ]
  },
  {
    "id": 10,
    "title": "Electronics",
    "createdAt": "2022-08-19T12:05:57.352Z",
    "updatedAt": "2022-08-23T10:41:54.747Z",
    "stores": [
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
        "categoryId": 10
      }
    ]
  },
  {
    "id": 26,
    "title": "Clothes",
    "createdAt": "2022-08-25T04:40:56.148Z",
    "updatedAt": "2022-08-25T04:40:56.148Z",
    "stores": []
  },
  {
    "id": 27,
    "title": "22",
    "createdAt": "2022-08-25T04:41:30.241Z",
    "updatedAt": "2022-08-25T04:41:30.241Z",
    "stores": []
  },
  {
    "id": 33,
    "title": "88",
    "createdAt": "2022-08-25T04:41:45.925Z",
    "updatedAt": "2022-08-25T04:41:45.925Z",
    "stores": []
  },
  {
    "id": 31,
    "title": "66",
    "createdAt": "2022-08-25T04:41:40.408Z",
    "updatedAt": "2022-08-25T04:41:40.408Z",
    "stores": []
  },
  {
    "id": 34,
    "title": "99",
    "createdAt": "2022-08-25T04:41:52.115Z",
    "updatedAt": "2022-08-25T04:41:52.115Z",
    "stores": []
  },
  {
    "id": 32,
    "title": "77",
    "createdAt": "2022-08-25T04:41:42.980Z",
    "updatedAt": "2022-08-25T04:41:42.980Z",
    "stores": []
  },
  {
    "id": 28,
    "title": "33",
    "createdAt": "2022-08-25T04:41:32.808Z",
    "updatedAt": "2022-08-25T04:41:32.808Z",
    "stores": []
  },
  {
    "id": 30,
    "title": "55",
    "createdAt": "2022-08-25T04:41:37.796Z",
    "updatedAt": "2022-08-25T04:41:37.796Z",
    "stores": []
  },
  {
    "id": 29,
    "title": "44",
    "createdAt": "2022-08-25T04:41:35.282Z",
    "updatedAt": "2022-08-25T04:41:35.282Z",
    "stores": []
  },
  {
    "id": 35,
    "title": "00",
    "createdAt": "2022-08-25T04:42:08.321Z",
    "updatedAt": "2022-08-25T04:42:08.321Z",
    "stores": []
  }
]

function getCategories() {
  CategoryDataService.getAll()
    .then(response => {
      response.data
    })
    .catch(e => {
      console.log(e);
    });
}

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
