<template>
  <b-sidebar
    id="add-new-user-sidebar"
    :visible="isAddNewUserSidebarActive"
    bg-variant="white"
    sidebar-class="sidebar-lg"
    shadow
    backdrop
    no-header
    right
    @hidden="resetForm"
    @change="(val) => $emit('update:is-add-new-user-sidebar-active', val)"
  >
    <template #default="{ hide }">
      <!-- Header -->
      <div class="d-flex justify-content-between align-items-center content-sidebar-header px-2 py-1">
        <h5 class="mb-0">
          {{ $t('Add New Object') }}
        </h5>

        <feather-icon
          class="ml-1 cursor-pointer"
          icon="XIcon"
          size="16"
          @click="hide"
        />

      </div>

      <!-- BODY -->
      <validation-observer
        #default="{ handleSubmit }"
        ref="refFormObserver"
      >
        <!-- Form -->
        <b-form
          class="p-2"
          @submit.prevent="handleSubmit(onSubmit)"
          @reset.prevent="resetForm"
        >

          <!-- Store title -->
          <validation-provider
            #default="validationContext"
            :name=" $t('Add New Object_title') "
            rules="required"
          >
            <b-form-group
              :label=" $t('Add New Object_title') "
              label-for="title"
            >
              <b-form-input
                type="text"
                id="title"
                name="title"
                v-model="store.title"
                autofocus
                :state="getValidationState(validationContext)"
                trim
                placeholder=""
              />

              <b-form-invalid-feedback>
                {{ validationContext.errors[0] }}
              </b-form-invalid-feedback>
            </b-form-group>
          </validation-provider>

          <!-- Description -->
          <validation-provider
            #default="validationContext"
            :name=" $t('Add New Object_description') "
            rules="required|alpha-num"
          >
            <b-form-group
              :label=" $t('Add New Object_description') "
              label-for="description"
            >
              <b-form-input
                id="description"
                name="description"
                v-model="store.description"
                :state="getValidationState(validationContext)"
                trim
              />

              <b-form-invalid-feedback>
                {{ validationContext.errors[0] }}
              </b-form-invalid-feedback>
            </b-form-group>
          </validation-provider>

          <!-- Store hours -->
          <validation-provider
            #default="validationContext"
            :name=" $t('Add New Object_Store_hours') "
            rules="required"
          >
            <b-form-group
              :label=" $t('Add New Object_Store_hours') "
              label-for="store_hours"
            >
              <b-form-input
                id="store_hours"
                name="store_hours"
                v-model="store.store_hours"
                :state="getValidationState(validationContext)"
                trim
              />

              <b-form-invalid-feedback>
                {{ validationContext.errors[0] }}
              </b-form-invalid-feedback>
            </b-form-group>
          </validation-provider>

          <!-- Categories -->
          <validation-provider
            #default="validationContext"
            :name=" $t('Add New Object_category') "
            rules="required"
          >
            <b-form-group
              :label=" $t('Add New Object_category') "
              label-for="categoryId"
              :state="getValidationState(validationContext)"
            >
              <label for="categoryId">Category</label>
              <select class="form-select" name="categoryId" id="categoryId" v-model="store.categoryId">
                <option disabled value="">Choose category...</option>
                <option v-for="cat in categories" v-bind:value="cat.id" :key="cat.id">{{ cat.title }}</option>
              </select>
              <b-form-invalid-feedback :state="getValidationState(validationContext)">
                {{ validationContext.errors[0] }}
              </b-form-invalid-feedback>
            </b-form-group>
          </validation-provider>

          <!-- Form Actions -->
          <div class="d-flex mt-2">
            <b-button
              v-ripple.400="'rgba(255, 255, 255, 0.15)'"
              variant="primary"
              class="mr-2"
              type="submit"
              @click="saveStore"
            >
              {{$t('Add')}}
            </b-button>
            <b-button
              v-ripple.400="'rgba(186, 191, 199, 0.15)'"
              type="button"
              variant="outline-secondary"
              @click="hide"
            >
              {{$t('Cancel')}}
            </b-button>
          </div>

        </b-form>
      </validation-observer>
    </template>
  </b-sidebar>
</template>

<script>
import StoreDataService from "../../../../services/StoreDataService";
import CategoryDataService from "../../../../services/CategoryDataService";

import {
  BSidebar, BForm, BFormGroup, BFormInput, BFormInvalidFeedback, BButton,
} from 'bootstrap-vue'
import { ValidationProvider, ValidationObserver } from 'vee-validate'
import { ref } from '@vue/composition-api'
import { required, alphaNum } from '@validations'
import formValidation from '@core/comp-functions/forms/form-validation'
import Ripple from 'vue-ripple-directive'
import vSelect from 'vue-select'
import store from '@/store'

export default {
  name: "add_store",
  components: {
    BSidebar,
    BForm,
    BFormGroup,
    BFormInput,
    BFormInvalidFeedback,
    BButton,
    vSelect,

    // Form Validation
    ValidationProvider,
    ValidationObserver,
  },
  directives: {
    Ripple,
  },
  model: {
    prop: 'isAddNewUserSidebarActive',
    event: 'update:is-add-new-user-sidebar-active',
  },
  props: {
    isAddNewUserSidebarActive: {
      type: Boolean,
      required: true,
    },
    // planOptions: {
    //   type: Array,
    //   required: true,
    // },
  },

  data() {
    return {
        store: {
        id: null,
        title: "",
        description: "",
        store_hours: "",
        categoryId: ""
      },
      submitted: false,
      categories: [],
      required,
      alphaNum
    }
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

    saveStore() {
      let data = {
        title: this.store.title,
        description: this.store.description,
        store_hours: this.store.store_hours,
        categoryId: Number(this.store.categoryId)
      };

      StoreDataService.create(data)
        .then(response => {
          this.store.id = response.data.id;
          console.log(response.data);
          this.submitted = true;
        })
        .catch(e => {
          console.log(e);
        });
    },
    
    newStore() {
      this.submitted = false;
      this.store = {};
    }
  },

  mounted() {
    this.retrieveCategories();
  },









  setup(props, { emit }) {
    const blankUserData = {
      fullName: '',
      username: '',
      currentPlan: null,
      company: '',
      contact: '',
    }

    const userData = ref(JSON.parse(JSON.stringify(blankUserData)))
    const resetuserData = () => {
      userData.value = JSON.parse(JSON.stringify(blankUserData))
    }

    const onSubmit = () => {
      store.dispatch('app-user/addUser', userData.value)
        .then(() => {
          emit('refetch-data')
          emit('update:is-add-new-user-sidebar-active', false)
        })
    }

    const {
      refFormObserver,
      getValidationState,
      resetForm,
    } = formValidation(resetuserData)

    return {
      userData,
      onSubmit,
      refFormObserver,
      getValidationState,
      resetForm,
    }
  },
}
</script>

<style lang="scss">
@import '@core/scss/vue/libs/vue-select.scss';

#add-new-user-sidebar {
  .vs__dropdown-menu {
    max-height: 200px !important;
  }
}
</style>