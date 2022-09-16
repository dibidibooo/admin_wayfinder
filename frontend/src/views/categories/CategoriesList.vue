<template>
  <div>
    <category-add-new
      :is-add-new-category-sidebar-active.sync="isAddNewCategorySidebarActive"
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
                @click="isAddNewCategorySidebarActive = true"
              >
                <span class="text-nowrap">{{ $t('Add shop') }}</span>
              </b-button>
            </div>
          </b-col>
        </b-row>

      </div>

      <b-table
        ref="refCategoriesListTable"
        class="position-relative"
        :items="fetchCategories"
        responsive
        :fields="fields"
        primary-key="id"
        :sort-by.sync="sortBy"
        show-empty
        :empty-text=" $t('No matching records found') "
        :sort-desc.sync="isSortDirDesc"
      >

        <!-- Column: Title -->
        <template #cell(title)="data">
          <b-media vertical-align="center">
            <b-link
              :to="{ name: 'category_details', params: { id: data.item.id } }"
              class="font-weight-bold d-block text-nowrap">
              {{ data.item.title }}
            </b-link>
          </b-media>
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

            <b-dropdown-item :to="{ name: 'category_details', params: { id: data.item.id } }">
              <feather-icon icon="EditIcon" />
              <span class="align-middle ml-50">{{ $t('Edit') }}</span>
            </b-dropdown-item>

            <b-dropdown-item @click="deleteCategory(data.item.id)">
              <feather-icon icon="TrashIcon" />
              <span class="align-middle ml-50">{{ $t('Delete') }}</span>
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
              :total-rows="totalCategories"
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
import CategoryDataService from "../../services/CategoryDataService";


import {
  BCard, BRow, BCol, BFormInput, BButton, BTable, BMedia, BAvatar, BLink,
  BBadge, BDropdown, BDropdownItem, BPagination,
} from 'bootstrap-vue'
import vSelect from 'vue-select'
import store from '@/store'
import { ref, onUnmounted } from '@vue/composition-api'
import useCategoriesList from './useCategoriesList'
import CategoryModule from './CategoryModule'
import CategoryAddNew from './CategoryAddNew.vue'

export default {
  name: "categories_list",
  data() {
    return {
      categories: [],
      currentCategory: null,
      currentIndex: -1,
      title: ""
    };
  },

  methods: {
    retrieveCategories() {
      CategoryDataService.getAll()
        .then(response => {
          this.categories = response.data;
        })
        .catch(e => {
          console.log(e);
        });
    },

    refreshList() {
      this.retrieveCategories();
      this.currentCategory = null;
      this.currentIndex = -1;
    },

    removeAllCategories() {
      CategoryDataService.deleteAll()
        .then(response => {
          console.log(response.data);
          this.refreshList();
        })
        .catch(e => {
          console.log(e);
        });
    },

    redirectToCategoryDetails() {
      this.$router.push({ name: 'category_details', params: { id: this.currentCategory.id } });
    },

    deleteCategory(id) {
      CategoryDataService.delete(id)
        .then(response => {
          console.log(response.data);
          this.refreshList();
          location.reload();
        })
        .catch(e => {
          console.log(e);
        });
    }
  },

  computed: {
    fields () {
      return [
        { key: 'title', label: this.$i18n.t('boutique_title'), sortable: true, thStyle: { width: "30%" } },
        { key: 'description', label: '', thStyle: { width: "20%" } },
        { key: 'store_hours', label: '', thStyle: { width: "20%" } },
        { key: 'category', label: '', thStyle: { width: "15%" } },
        { key: 'actions', label: this.$i18n.t('boutique_action'),  thStyle: { width: "15%" } },
      ]
    }
  },

  mounted() {
    this.retrieveCategories();
  },


  components: {
    CategoryAddNew,

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
    const USER_APP_STORE_MODULE_NAME = 'app-category'

    // Register module
    if (!store.hasModule(USER_APP_STORE_MODULE_NAME)) store.registerModule(USER_APP_STORE_MODULE_NAME, CategoryModule)

    // UnRegister on leave
    onUnmounted(() => {
      if (store.hasModule(USER_APP_STORE_MODULE_NAME)) store.unregisterModule(USER_APP_STORE_MODULE_NAME)
    })

    const isAddNewCategorySidebarActive = ref(false)

    const {
      fetchCategories,
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
    } = useCategoriesList()

    return {

      // Sidebar
      isAddNewCategorySidebarActive,

      fetchCategories,
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
