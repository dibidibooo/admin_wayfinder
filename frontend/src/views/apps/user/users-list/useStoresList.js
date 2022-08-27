import { ref, watch, computed } from '@vue/composition-api'
import store from '@/store'

// Notification
import { useToast } from 'vue-toastification/composition'
import ToastificationContent from '@core/components/toastification/ToastificationContent.vue'

export default function useStoresList() {
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

  watch([currentPage, perPage, searchQuery], () => {
    refetchData()
  })

  const fetchStores = (ctx, callback) => {
    store
      .dispatch('app-store/fetchStores', {
        q: searchQuery.value,
        perPage: perPage.value,
        page: currentPage.value,
        sortBy: sortBy.value,
        sortDesc: isSortDirDesc.value
      })
      .then(response => {
        const { stores, total } = response.data
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

  // const deleteStore = (id) => {
    // store
    //   .dispatch(`app-store/deleteStore`, { id: id })
    //   .then(response => console.log(response.data))
  // }

  // *===============================================---*
  // *--------- UI ---------------------------------------*
  // *===============================================---*

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
    refetchData,
    // deleteStore
  }
}
