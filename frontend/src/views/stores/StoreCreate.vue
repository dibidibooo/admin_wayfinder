<template>
  <b-sidebar id="add-new-store-sidebar" :visible="isAddNewStoreSidebarActive" bg-variant="white"
    sidebar-class="sidebar-lg" shadow backdrop no-header right @hidden="resetForm"
    @change="(val) => $emit('update:is-add-new-store-sidebar-active', val)">
    <template #default="{ hide }">
      <!-- Header -->
      <div class="
          d-flex
          justify-content-between
          align-items-center
          content-sidebar-header
          px-2
          py-1
        ">
        <h5 class="mb-0">
          {{ $t("Add New Object") }}
        </h5>

        <feather-icon class="ml-1 cursor-pointer" icon="XIcon" size="16" @click="hide" />
      </div>

      <!-- BODY -->
      <validation-observer #default="{ handleSubmit }" ref="refFormObserver">
        <!-- Form -->
        <b-form class="p-2" 
          enctype="multipart/form-data" 
          @submit.prevent="handleSubmit(onSubmit)"
        >
          <!-- Store title -->
          <validation-provider #default="validationContext" :name="$t('Add New Object_title')">
            <b-form-group :label="$t('Add New Object_title')" label-for="title">
              <b-form-input type="text" id="title" name="title" v-model="store.title" autofocus
                :state="getValidationState(validationContext)" trim placeholder="" required/>
              <b-form-invalid-feedback>
                {{ validationContext.errors[0] }}
              </b-form-invalid-feedback>
            </b-form-group>
          </validation-provider>

          <!-- Description -->
          <validation-provider #default="validationContext" :name="$t('Add New Object_description')">
            <b-form-group :label="$t('Add New Object_description')" label-for="description">
              <b-form-input id="description" name="description" v-model="store.description"
                :state="getValidationState(validationContext)" trim required/>
              <b-form-invalid-feedback>
                {{ validationContext.errors[0] }}
              </b-form-invalid-feedback>
            </b-form-group>
          </validation-provider>

          <!-- Store hours -->
          <validation-provider #default="validationContext" :name="$t('Add New Object_Store_hours')">
            <b-form-group :label="$t('Add New Object_Store_hours')" label-for="store_hours">
              <b-form-input id="store_hours" name="store_hours" v-model="store.store_hours"
                :state="getValidationState(validationContext)" trim required/>
              <b-form-invalid-feedback>
                {{ validationContext.errors[0] }}
              </b-form-invalid-feedback>
            </b-form-group>
          </validation-provider>

          <!-- Categories -->
          <validation-provider #default="validationContext" :name="$t('Add New Object_category')">
            <b-form-group :label="$t('Add New Object_category')" label-for="categoryId"
              :state="getValidationState(validationContext)">
              <b-form-select class="form-select" name="categoryId" id="categoryId" v-model="store.categoryId" required>
                <option disabled value="">{{ $t("Choose") }}</option>
                <option v-for="cat in categories" v-bind:value="cat.id" :key="cat.id">
                  {{ cat.title }}
                </option>
              </b-form-select>
              <b-form-invalid-feedback :state="getValidationState(validationContext)">
                {{ validationContext.errors[0] }}
              </b-form-invalid-feedback>
            </b-form-group>
          </validation-provider>

          <!-- Image -->
          <validation-provider #default="validationContext" :name="$t('Media Image')">
            <b-form-group :label="$t('Media Image')" label-for="image">
              <b-media no-body vertical-align="center" class="flex-column flex-md-row">
                <b-media-aside>
                  <b-img ref="refPreviewEl" :src="blogEdit.featuredImage" height="110" width="170"
                    class="rounded mr-2 mb-1 mb-md-0" />
                </b-media-aside>
                <b-media-body>
                  <small class="text-muted">Required image resolution 800x400, image size 10mb.</small>
                  <div class="d-inline-block">
                    <b-form-file ref="refInputEl" v-model="store.image" name="image" accept=".jpg, .png, .gif, .jpeg"
                      placeholder="Choose file" @input="inputImageRenderer" required/>
                  </div>
                </b-media-body>
              </b-media>

              <b-form-invalid-feedback>
                {{ validationContext.errors[0] }}
              </b-form-invalid-feedback>
            </b-form-group>
          </validation-provider>

          <!-- Form Actions -->
          <div class="d-flex mt-2">
            <b-button v-ripple.400="'rgba(255, 255, 255, 0.15)'" variant="primary" class="mr-2" type="submit"
              @click="saveStore">
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
import StoreDataService from "../../services/StoreDataService";
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
import { ref } from "@vue/composition-api";
import formValidation from "@core/comp-functions/forms/form-validation";
import Ripple from "vue-ripple-directive";
import vSelect from "vue-select";
import store from "@/store";
import { useInputImageRenderer } from '@core/comp-functions/forms/form-utils'

export default {
  name: "add_store",
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
    prop: "isAddNewStoreSidebarActive",
    event: "update:is-add-new-store-sidebar-active",
  },
  props: {
    isAddNewStoreSidebarActive: {
      type: Boolean,
      required: true,
    }
  },

  data() {
    return {
      blogEdit: {},
      store: {
        id: null,
        title: "",
        description: "",
        store_hours: "",
        categoryId: "",
        image: null
      },
      categories: []
    };
  },
  
  created() {
    this.$http.get('/blog/list/data/edit').then(res => { this.blogEdit = res.data })
  },

  methods: {
    retrieveCategories() {
      CategoryDataService.getAll()
        .then((response) => {
          this.categories = response.data;
        })
        .catch((e) => {
          console.log(e);
        });
    },

    saveStore() {
      const formData = new FormData();
      formData.append("image", this.store.image);
      formData.append("title", this.store.title);
      formData.append("description", this.store.description);
      formData.append("store_hours", this.store.store_hours);
      formData.append("categoryId", Number(this.store.categoryId));

      StoreDataService.create(formData)
        .then((response) => {
          this.store.id = response.data.id;
          console.log(response.data);
          location.reload();
        })
        .catch((e) => {
          console.log(e);
        });
    }
  },

  mounted() {
    this.retrieveCategories();
  },

  setup(props, { emit }) {
    const blankStore = {
      id: null,
      title: "",
      description: "",
      store_hours: "",
      categoryId: "",
      image: null
    };

    const refInputEl = ref(null)
    const refPreviewEl = ref(null)
    const { inputImageRenderer } = useInputImageRenderer(refInputEl, base64 => { refPreviewEl.value.src = base64 })

    const storeData = ref(JSON.parse(JSON.stringify(blankStore)));
    const resetstoreData = () => {
      storeData.value = JSON.parse(JSON.stringify(blankStore));
    };

    const onSubmit = () => {
      // store.dispatch("app-store/saveStore", storeData.value).then(() => {
      emit("refetch-data");
      emit("update:is-add-new-store-sidebar-active", false);
      // });
    };

    const { refFormObserver, getValidationState, resetForm } =
      formValidation(resetstoreData);

    return {
      storeData,
      onSubmit,
      refFormObserver,
      getValidationState,
      resetForm,
      refInputEl,
      refPreviewEl,
      inputImageRenderer,
    };
  },
};
</script>

<style lang="scss">
@import "@core/scss/vue/libs/vue-select.scss";

#add-new-store-sidebar {
  .vs__dropdown-menu {
    max-height: 200px !important;
  }
}
</style>