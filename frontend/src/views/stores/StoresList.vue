<template>
  <div>
    <user-list-add-new 
      :is-add-new-store-sidebar-active.sync="isAddNewStoreSidebarActive" 
      @refetch-data="refetchData" />

    <!-- Table Container Card -->
    <b-card 
      no-body 
      class="mb-0"
    >
      <div class="m-2">
        <!-- Table Top -->
        <b-row>
          <!-- Per Page -->
          <b-col cols="12" md="6" class="d-flex align-items-center justify-content-start mb-1 mb-md-0">
            <label>{{ $t('Show') }}</label>
            <v-select v-model="perPage" :dir="$store.state.appConfig.isRTL ? 'rtl' : 'ltr'" :options="perPageOptions"
              :clearable="false" class="per-page-selector d-inline-block mx-50" />
            <label>{{ $t('entries') }}</label>
          </b-col>

          <!-- Search -->
          <b-col cols="12" md="6">
            <div class="d-flex align-items-center justify-content-end">
              <b-form-input v-model="searchQuery" class="d-inline-block mr-1" :placeholder="$t('Search')" />
              <b-button variant="primary" @click="isAddNewStoreSidebarActive = true">
                <span class="text-nowrap">{{ $t('Add shop') }}</span>
              </b-button>
            </div>
          </b-col>
        </b-row>

      </div>

      <b-table 
        ref="refStoresListTable" 
        class="position-relative" 
        :items="fetchStores" 
        responsive 
        :fields="fields"
        primary-key="id" 
        :sort-by.sync="sortBy" 
        show-empty 
        :empty-text="$t('No matching records found')"
        :sort-desc.sync="isSortDirDesc"
      >

        <!-- Column: Title -->
        <template #cell(title)="data">
          <b-media vertical-align="center">
            <template #aside>
              <b-avatar
                size="32"
                :text="avatarText(data.item.title)"
                :to="{ name: 'store_details', params: { id: data.item.id } }"
              />
            </template>
            <b-link :to="{ name: 'store_details', params: { id: data.item.id } }"
              class="font-weight-bold d-block text-nowrap">
              {{ data.item.title }}
            </b-link>
          </b-media>
        </template>

        <!-- Column: Description -->
        <template #cell(description)="data">
          <div class="text-nowrap">
            <span class="align-text-top text-capitalize">
              {{ data.item.description }}
            </span>
          </div>
        </template>

        <!-- Column: Store hours -->
        <template #cell(store_hours)="data">
          <b-badge pill class="text-capitalize">
            {{ data.item.store_hours }}
          </b-badge>
        </template>

        <!-- Column: Category -->
        <template #cell(category)="data">
          <div class="text-nowrap">
            <span v-if="data.item.categoryId" class="align-text-top text-capitalize">
              {{ data.item.category.title }}
            </span>
            <span v-else>No category</span>
          </div>
        </template>

        <!-- Column: Actions -->
        <template #cell(actions)="data">
          <b-dropdown variant="link" no-caret :right="$store.state.appConfig.isRTL">

            <template #button-content>
              <feather-icon icon="MoreVerticalIcon" size="16" class="align-middle text-body" />
            </template>
            <b-dropdown-item :to="{ name: 'store_details', params: { id: data.item.id } }">
              <feather-icon icon="FileTextIcon" />
              <span class="align-middle ml-50">{{ $t('Detail') }}</span>
            </b-dropdown-item>

            <b-dropdown-item :to="{ name: 'store_update', params: { id: data.item.id } }">
              <feather-icon icon="EditIcon" />
              <span class="align-middle ml-50">{{ $t('Edit') }}</span>
            </b-dropdown-item>

            <b-dropdown-item @click="deleteStore(data.item.id)">
              <feather-icon icon="TrashIcon" />
              <span class="align-middle ml-50">{{ $t('Delete') }}</span>
            </b-dropdown-item>
          </b-dropdown>
        </template>

      </b-table>
      <div class="mx-2 mb-2">
        <b-row>

          <b-col cols="12" sm="6" class="d-flex align-items-center justify-content-center justify-content-sm-start">
            <span class="text-muted">{{ $t('Showing') }} {{ dataMeta.from }} {{ $t('to') }} {{ dataMeta.to }} {{
                $t('of')
            }} {{ dataMeta.of }} {{ $t('entries') }}</span>
          </b-col>
          <!-- Pagination -->
          <b-col cols="12" sm="6" class="d-flex align-items-center justify-content-center justify-content-sm-end">

            <b-pagination v-model="currentPage" :total-rows="totalStores" :per-page="perPage" first-number last-number
              class="mb-0 mt-1 mt-sm-0" prev-class="prev-item" next-class="next-item">
              <template #prev-text>
                <feather-icon icon="ChevronLeftIcon" size="18" />
              </template>
              <template #next-text>
                <feather-icon icon="ChevronRightIcon" size="18" />
              </template>
            </b-pagination>

          </b-col>

        </b-row>
      </div>
    </b-card>
  </div>
</template>

<script>
import StoreDataService from "../../services/StoreDataService"


import {
  BCard, BRow, BCol, BFormInput, BButton, BTable, BMedia, BAvatar, BLink,
  BBadge, BDropdown, BDropdownItem, BPagination,
} from 'bootstrap-vue'
import vSelect from 'vue-select'
import store from '@/store'
import { ref, onUnmounted } from '@vue/composition-api'
import { avatarText } from '@core/utils/filter'
import UsersListFilters from './UsersListFilters.vue'
import useStoresList from './useStoresList'
import StoreModule from './StoreModule'
import UserListAddNew from './StoreCreate.vue'

export default {
  name: "stores_list",
  data() {
    return {
      currentStore: null,
      currentIndex: -1,
      title: "",
      total_stores: null
    };
  },

  components: {
    UsersListFilters,
    UserListAddNew,

    BCard,
    BRow,
    BCol,
    BFormInput,
    BButton,
    BTable,
    BMedia,
    BAvatar,
    BLink,
    BBadge,
    BDropdown,
    BDropdownItem,
    BPagination,

    vSelect,
  },

  computed: {
    fields () {
      return [
        { key: 'title', label: this.$i18n.t('boutique_title'), sortable: true },
        { key: 'description', label: this.$i18n.t('boutique_desc'), sortable: true },
        { key: 'store_hours', label: this.$i18n.t('boutique_hours'), sortable: true },
        { key: 'category', label: this.$i18n.t('boutiqe_category'), sortable: true },
        { key: 'actions', label: this.$i18n.t('boutique_action'),  },
      ]
    }
  },

  setup(props, { emit }) {
    const USER_APP_STORE_MODULE_NAME = 'app-store'

    // Register module
    if (!store.hasModule(USER_APP_STORE_MODULE_NAME)) store.registerModule(USER_APP_STORE_MODULE_NAME, StoreModule)

    // UnRegister on leave
    onUnmounted(() => {
      if (store.hasModule(USER_APP_STORE_MODULE_NAME)) store.unregisterModule(USER_APP_STORE_MODULE_NAME)
    })

    const deleteStore = (id) => {
      StoreDataService.delete(id)
        .then(response => {
          emit("refetch-data");
          console.log(response.data);
        })
        .catch(e => {
          console.log(e);
        });
    }

    const isAddNewStoreSidebarActive = ref(false)

    const {
      fetchStores,
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
    } = useStoresList()

    return {

      // Sidebar
      isAddNewStoreSidebarActive,

      fetchStores,
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
      deleteStore,

      // Filter
      avatarText
    }
  },
}
</script>

<style lang="scss" scoped>
.per-page-selector {
  width: 90px;
}
</style>

<style lang="scss">
@import '@core/scss/vue/libs/vue-select.scss';
</style>
