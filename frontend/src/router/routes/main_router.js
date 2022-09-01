export default [
  {
    path: '/stores',
    name: 'stores_list',
    component: () => import('@/views/stores/StoresList.vue'),
  },
  {
    path: "/store/:id",
    name: "store_details",
    component: () => import('@/views/stores/StoreDetail.vue'),
  },
  {
    path: "/store/:id",
    name: "store_update",
    component: () => import('@/views/stores/StoreUpdate.vue'),
  },
  {
    path: "/categories",
    name: "categories_list",
    component: () => import('@/views/categories/CategoriesList.vue'),
  },
  {
    path: "/category/:id",
    name: "category_details",
    component: () => import('@/views/categories/CategoryDetail.vue'),
  },
  {
    path: '/login2',
    name: "login2",
    component: () => import('@/views/accounts/Login.vue'),
  },
  {
    path: '/register2',
    name: "register2",
    component: () => import('@/views/accounts/Register.vue'),
  },
  {
    path: '/admin',
    name: 'admin',
    // lazy-loaded
    component: () => import('@/views/accounts/BoardAdmin.vue')
  },
  {
    path: '/user',
    name: 'user',
    // lazy-loaded
    component: () => import('@/views/accounts/BoardUser.vue')
  }
]
