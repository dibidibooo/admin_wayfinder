<template>
  <div>
    <user-list-add-new
      :is-add-new-user-sidebar-active.sync="isAddNewUserSidebarActive"
      @refetch-data="refetchData"
    />

    <!-- Table Container Card -->
    <b-card
      no-body
      class="mb-0"
    >
      <div class="m-2">
        <!-- Table Top -->
        <b-row>
          <!-- Per Page -->
          <b-col
            cols="12"
            md="6"
            class="d-flex align-items-center justify-content-start mb-1 mb-md-0"
          >
            <label>{{ $t('Show') }}</label>
            <v-select
              v-model="perPage"
              :dir="$store.state.appConfig.isRTL ? 'rtl' : 'ltr'"
              :options="perPageOptions"
              :clearable="false"
              class="per-page-selector d-inline-block mx-50"
            />
            <label>{{ $t('entries') }}</label>
          </b-col>

          <!-- Search -->
          <b-col
            cols="12"
            md="6"
          >
            <div class="d-flex align-items-center justify-content-end">
              <b-form-input
                v-model="searchQuery"
                class="d-inline-block mr-1"
                :placeholder=" $t('Search')"
              />
              <b-button
                variant="primary"
                @click="isAddNewUserSidebarActive = true"
              >
                <span class="text-nowrap">{{ $t('Add shop') }}</span>
              </b-button>
            </div>
          </b-col>
        </b-row>

      </div>

      <b-table
        class="position-relative"
        :items="stores"
        responsive
        :fields="tableColumns"
        primary-key="id"
        :sort-by.sync="sortBy"
        show-empty
        :empty-text=" $t('No matching records found') "
        :sort-desc.sync="isSortDirDesc"
      >

        <!-- Column: Title -->
        <template #cell(title)="data">
          <b-media vertical-align="center">
            <template #aside>
              <b-avatar
                size="32"
                :src="data.item.image"
                :text="avatarText(data.item.title)"
                :to="{ name: 'store_details', params: { id: data.item.id } }"
              />
            </template>
            <b-link
              :to="{ name: 'store_details', params: { id: data.item.id } }"
              class="font-weight-bold d-block text-nowrap">
              {{ data.item.title }}
            </b-link>
          </b-media>
        </template>

        <!-- Column: Description -->
        <template #cell(description)="data">
          <div class="text-nowrap">
            <span class="align-text-top text-capitalize">{{ data.item.description }}</span>
          </div>
        </template>

        <!-- Column: Store hours -->
        <template #cell(store_hours)="data">
          <b-badge
            pill
            :variant="`light-${resolveUserStatusVariant(data.item.store_hours)}`"
            class="text-capitalize"
          >
            {{ data.item.store_hours }}
          </b-badge>
        </template>

        <!-- Column: Category -->
        <template #cell(category)="data">
          <div class="text-nowrap">
            <span class="align-text-top text-capitalize">{{ data.item.category.title }}</span>
          </div>
        </template>

        <!-- Column: Actions -->
        <template #cell(actions)="data">
          <b-dropdown
            variant="link"
            no-caret
            :right="$store.state.appConfig.isRTL"
          >

            <template #button-content>
              <feather-icon
                icon="MoreVerticalIcon"
                size="16"
                class="align-middle text-body"
              />
            </template>
            <b-dropdown-item :to="{ name: 'store_details', params: { id: data.item.id } }">
              <feather-icon icon="FileTextIcon" />
              <span class="align-middle ml-50">{{ $t('Detail') }}</span>
            </b-dropdown-item>

            <b-dropdown-item :to="{ name: 'store_details', params: { id: data.item.id } }">
              <feather-icon icon="EditIcon" />
              <span class="align-middle ml-50">{{ $t('Edit') }}</span>
            </b-dropdown-item>

            <b-dropdown-item>
              <feather-icon icon="TrashIcon" />
              <span class="align-middle ml-50" @click="deleteStore(data.item.id)">{{ $t('Delete') }}</span>
            </b-dropdown-item>
          </b-dropdown>
        </template>

      </b-table>
      <div class="mx-2 mb-2">
        <b-row>

          <b-col
            cols="12"
            sm="6"
            class="d-flex align-items-center justify-content-center justify-content-sm-start"
          >
            <span class="text-muted">{{ $t('Showing') }} {{ dataMeta.from }} {{ $t('to') }} {{ dataMeta.to }} {{ $t('of') }} {{ dataMeta.of }} {{ $t('entries') }}</span>
          </b-col>
          <!-- Pagination -->
          <b-col
            cols="12"
            sm="6"
            class="d-flex align-items-center justify-content-center justify-content-sm-end"
          >

            <b-pagination
              v-model="currentPage"
              :total-rows="totalStores"
              :per-page="perPage"
              first-number
              last-number
              class="mb-0 mt-1 mt-sm-0"
              prev-class="prev-item"
              next-class="next-item"
            >
              <template #prev-text>
                <feather-icon
                  icon="ChevronLeftIcon"
                  size="18"
                />
              </template>
              <template #next-text>
                <feather-icon
                  icon="ChevronRightIcon"
                  size="18"
                />
              </template>
            </b-pagination>

          </b-col>

        </b-row>
      </div>
    </b-card>
  </div>
</template>

<script>
import StoreDataService from "../../../../services/StoreDataService";


import {
  BCard, BRow, BCol, BFormInput, BButton, BTable, BMedia, BAvatar, BLink,
  BBadge, BDropdown, BDropdownItem, BPagination,
} from 'bootstrap-vue'
import vSelect from 'vue-select'
import store from '@/store'
import { ref, onUnmounted } from '@vue/composition-api'
import { avatarText } from '@core/utils/filter'
import UsersListFilters from './UsersListFilters.vue'
import useUsersList from './useUsersList'
import userStoreModule from '../userStoreModule'
import UserListAddNew from './UserListAddNew.vue'

export default {
  name: "stores_list",
  data() {
    return {
      stores: [],
      currentStore: null,
      currentIndex: -1,
      title: ""
    };
  },

  methods: {
    retrieveStores() {
      StoreDataService.getAll()
        .then(response => {
          this.stores = response.data;
          console.log(response.data);
        })
        .catch(e => {
          console.log(e);
        });
    },

    refreshList() {
      this.retrieveStores();
      this.currentStore = null;
      this.currentIndex = -1;
    },

    setActiveStore(store, index) {
      this.currentStore = store;
      this.currentIndex = index;
    },

    removeAllStores() {
      StoreDataService.deleteAll()
        .then(response => {
          console.log(response.data);
          this.refreshList();
        })
        .catch(e => {
          console.log(e);
        });
    },

    searchTitle() {
      StoreDataService.findByTitle(this.title)
        .then(response => {
          this.stores = response.data;
          console.log(response.data);
        })
        .catch(e => {
          console.log(e);
        });
    },

    redirectToStoreDetails() {
      this.$router.push({ name: 'store_details', params: { id: this.currentStore.id } });
    },

    deleteStore(id) {
      StoreDataService.delete(id)
        .then(response => {
          console.log(response.data);
          this.$router.push({ name: "stores" });
        })
        .catch(e => {
          console.log(e);
        });
    }
  },

  mounted() {
    this.retrieveStores();
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
  setup() {
    const USER_APP_STORE_MODULE_NAME = 'app-user'

    // Register module
    if (!store.hasModule(USER_APP_STORE_MODULE_NAME)) store.registerModule(USER_APP_STORE_MODULE_NAME, userStoreModule)

    // UnRegister on leave
    onUnmounted(() => {
      if (store.hasModule(USER_APP_STORE_MODULE_NAME)) store.unregisterModule(USER_APP_STORE_MODULE_NAME)
    })

    const isAddNewUserSidebarActive = ref(false)

    const {
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
      refUserListTable,
      refetchData,

      // UI
      resolveUserRoleVariant,
      resolveUserStatusVariant,

      // Extra Filters
      categoryFilter,
      descriptionFilter
    } = useUsersList()

    return {

      // Sidebar
      isAddNewUserSidebarActive,

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
      refUserListTable,
      refetchData,

      // Filter
      avatarText,

      // UI
      resolveUserRoleVariant,
      resolveUserStatusVariant,

      // Extra Filters
      categoryFilter,
      descriptionFilter
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
