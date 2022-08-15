import { ref, watch, computed } from '@vue/composition-api'

// Notification
import { useToast } from 'vue-toastification/composition'
import ToastificationContent from '@core/components/toastification/ToastificationContent.vue'

export default function useUsersList() {
  // Use toast
  const toast = useToast()

  const refStoresListTable = ref(null)

  // Table Handlers
  const tableColumns = [
    { key: 'title', sortable: true },
    { key: 'description', sortable: true },
    { key: 'store_hours', sortable: true },
    { key: 'category', sortable: true },
    { key: 'actions' },
  ]
  const perPage = ref(10)
  const totalStores = ref(0)
  const currentPage = ref(1)
  const perPageOptions = [10, 25, 50, 100]
  const searchQuery = ref('')
  const sortBy = ref('id')
  const isSortDirDesc = ref(true)
  const categoryFilter = ref(null)
  const descriptionFilter = ref(null)

  const dataMeta = computed(() => {
    const localItemsCount = refStoresListTable.value ? refStoresListTable.value.localItems.length : 0
    return {
      from: perPage.value * (currentPage.value - 1) + (localItemsCount ? 1 : 0),
      to: perPage.value * (currentPage.value - 1) + localItemsCount,
      of: totalStores.value,
    }
  })

  const refetchData = () => {
    refStoresListTable.value.refresh()
  }

  watch([currentPage, perPage, searchQuery, categoryFilter, descriptionFilter], () => {
    refetchData()
  })

  const fetchStores = (ctx, callback) => {
    store
      .dispatch('app-user/fetchStores', {
        q: searchQuery.value,
        perPage: perPage.value,
        page: currentPage.value,
        sortBy: sortBy.value,
        sortDesc: isSortDirDesc.value,
          // category: categoryFilter.value,
          // description: descriptionFilter.value
      })
      .then(response => {
        const { stores, total } = response.data
        console.log('GGGGGGG')
        callback(stores)
        totalStores.value = total
      })
      .catch(() => {
        toast({
          component: ToastificationContent,
          props: {
            title: 'Error fetching stores list',
            icon: 'AlertTriangleIcon',
            variant: 'danger',
          },
        })
      })
  }

  // *===============================================---*
  // *--------- UI ---------------------------------------*
  // *===============================================---*

  const resolveUserRoleVariant = role => {
    if (role === 'subscriber') return 'primary'
    if (role === 'author') return 'warning'
    if (role === 'maintainer') return 'success'
    if (role === 'editor') return 'info'
    if (role === 'admin') return 'danger'
    return 'primary'
  }

  const resolveUserStatusVariant = status => {
    if (status === 'pending') return 'warning'
    if (status === 'active') return 'success'
    if (status === 'inactive') return 'secondary'
    return 'primary'
  }

  return {
    fetchStores,
    tableColumns,
    perPage,
    currentPage,
    totalStores,
    dataMeta,
    perPageOptions,
    searchQuery,
    sortBy,
    isSortDirDesc,
    refStoresListTable,

    resolveUserRoleVariant,
    resolveUserStatusVariant,
    refetchData,

    // Extra Filters
    categoryFilter,
    descriptionFilter
  }
}
