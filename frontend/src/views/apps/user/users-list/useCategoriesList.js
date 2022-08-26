import { ref, watch, computed } from '@vue/composition-api'
import store from '@/store'

// Notification
import { useToast } from 'vue-toastification/composition'
import ToastificationContent from '@core/components/toastification/ToastificationContent.vue'

export default function useCategoriesList() {
  // Use toast
  const toast = useToast()

  const refCategoriesListTable = ref(null)

  // Table Handlers
  const tableColumns = [
    { key: 'title', sortable: true },
    { key: 'actions' },
  ]

  const perPage = ref(10)
  const totalCategories = ref(0)
  const currentPage = ref(1)
  const perPageOptions = [10, 25, 50, 100]
  const searchQuery = ref('')
  const sortBy = ref('id')
  const isSortDirDesc = ref(true)

  const dataMeta = computed(() => {
    const localItemsCount = refCategoriesListTable.value ? refCategoriesListTable.value.localItems.length : 0
    return {
      from: perPage.value * (currentPage.value - 1) + (localItemsCount ? 1 : 0),
      to: perPage.value * (currentPage.value - 1) + localItemsCount,
      of: totalCategories.value,
    }
  })

  const refetchData = () => {
    refCategoriesListTable.value.refresh()
  }

  watch([currentPage, perPage, searchQuery], () => {
    refetchData()
  })

  const fetchCategories = (ctx, callback) => {
    store
      .dispatch('app-category/fetchCategories', {
        q: searchQuery.value,
        perPage: perPage.value,
        page: currentPage.value,
        sortBy: sortBy.value,
        sortDesc: isSortDirDesc.value,
      })
      .then(response => {
        const { categories, total } = response.data
        callback(categories)
        totalCategories.value = total
      })
      .catch(() => {
        toast({
          component: ToastificationContent,
          props: {
            title: 'Error fetching categories list',
            icon: 'AlertTriangleIcon',
            variant: 'danger',
          },
        })
      })
  }

  // *===============================================---*
  // *--------- UI ---------------------------------------*
  // *===============================================---*

  return {
    fetchCategories,
    tableColumns,
    perPage,
    currentPage,
    totalCategories,
    dataMeta,
    perPageOptions,
    searchQuery,
    sortBy,
    isSortDirDesc,
    refCategoriesListTable,
    refetchData
  }
}
