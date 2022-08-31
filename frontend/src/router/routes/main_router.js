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
  }
]
