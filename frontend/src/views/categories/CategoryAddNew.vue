<template>
  <b-sidebar id="add-new-category-sidebar" :visible="isAddNewCategorySidebarActive" bg-variant="white"
    sidebar-class="sidebar-lg" shadow backdrop no-header right
    @change="(val) => $emit('update:is-add-new-category-sidebar-active', val)">
    <template #default="{ hide }">
      <!-- Header -->
      <div class="d-flex justify-content-between align-items-center content-sidebar-header px-2 py-1">
        <h5 class="mb-0">
          {{ $t("Add New Object") }}
        </h5>

        <feather-icon class="ml-1 cursor-pointer" icon="XIcon" size="16" @click="hide" />
      </div>

      <!-- BODY -->
      <validation-observer #default="{ handleSubmit }" ref="refFormObserver">
        <!-- Form -->
        <b-form class="p-2">
          <!-- Store title -->
          <validation-provider #default="validationContext" :name="$t('Add New Object_title')" rules="required">
            <b-form-group :label="$t('Add New Object_title')" label-for="title">
              <b-form-input type="text" id="title" name="title" v-model="category.title" autofocus
                trim placeholder="" required />

              <b-form-invalid-feedback>
                {{ validationContext.errors[0] }}
              </b-form-invalid-feedback>
            </b-form-group>
          </validation-provider>

          <!-- Form Actions -->
          <div class="d-flex mt-2">
            <b-button v-ripple.400="'rgba(255, 255, 255, 0.15)'" variant="primary" class="mr-2" type="submit"
              @click="saveCategory">
              {{ $t("Add") }}
            </b-button>
            <b-button v-ripple.400="'rgba(186, 191, 199, 0.15)'" type="button" variant="outline-secondary"
              @click="hide">
              {{ $t("Cancel") }}
            </b-button>
          </div>
        </b-form>
      </validation-observer>
    </template>
  </b-sidebar>
</template>

<script>
import CategoryDataService from "../../services/CategoryDataService";

import {
  BSidebar,
  BForm,
  BFormGroup,
  BFormInput,
  BFormSelect,
  BFormInvalidFeedback,
  BButton,
  BMedia,
  BMediaAside,
  BMediaBody,
  BImg,
  BFormFile,
  BLink,
} from "bootstrap-vue";
import { ValidationProvider, ValidationObserver } from "vee-validate";
// import { ref } from "@vue/composition-api";
import { required } from "@validations";
// import formValidation from "@core/comp-functions/forms/form-validation";
import Ripple from "vue-ripple-directive";
import vSelect from "vue-select";

export default {
  name: "add_category",
  components: {
    BSidebar,
    BForm,
    BFormGroup,
    BFormInput,
    BFormInvalidFeedback,
    BFormSelect,
    BButton,
    BMedia,
    BMediaAside,
    BMediaBody,
    BImg,
    BFormFile,
    BLink,
    vSelect,

    // Form Validation
    ValidationProvider,
    ValidationObserver,
  },
  directives: {
    Ripple,
  },
  model: {
    prop: "isAddNewCategorySidebarActive",
    event: "update:is-add-new-category-sidebar-active",
  },
  props: {
    isAddNewCategorySidebarActive: {
      type: Boolean,
      required: true,
    },
  },

  data() {
    return {
      category: {
        id: null,
        title: ""
      },
      required,
    };
  },

  methods: {
    saveCategory() {
      let data = {
        title: this.category.title
      };

      CategoryDataService.create(data)
        .then(response => {
          this.category.id = response.data.id;
          console.log(response.data);
        })
        .catch(e => {
          console.log(e);
        });
    },
  },

  // setup(props, { emit }) {
    // const blankUserData = {
    //   fullName: "",
    //   username: "",
    //   currentPlan: null,
    //   company: "",
    //   contact: "",
    // };

    // const refPreviewEl = ref(null)

    // const userData = ref(JSON.parse(JSON.stringify(blankUserData)));
    // const resetuserData = () => {
    //   userData.value = JSON.parse(JSON.stringify(blankUserData));
    // };

    // const { refFormObserver, getValidationState, resetForm } =
    //   formValidation(resetuserData);

    // return {
  //     // userData,
      // refFormObserver,
      // getValidationState,
  //     resetForm,
      // refPreviewEl
  //   };
  // },
};
</script>

<style lang="scss">
@import "@core/scss/vue/libs/vue-select.scss";

#add-new-category-sidebar {
  .vs__dropdown-menu {
    max-height: 200px !important;
  }
}
</style>