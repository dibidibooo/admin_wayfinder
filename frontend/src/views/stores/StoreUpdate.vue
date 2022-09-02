<template>
  <b-card>

    <!-- media -->
    <b-media no-body>
      <b-media-aside>
        <b-link>
          <b-img ref="refPreviewEl" :src="image_path + image_name" rounded height="80" />
        </b-link>
      </b-media-aside>

      <b-media-body class="mt-75 ml-75">
        <!-- upload button -->
        <b-button v-ripple.400="'rgba(255, 255, 255, 0.15)'" variant="primary" size="sm" class="mb-75 mr-75"
          @click="$refs.refInputEl.$el.click()">
          Upload
        </b-button>
        <b-form-file ref="refInputEl" name="image" accept=".jpg, .png, .gif, .jpeg" @change="getImg" :hidden="true"
          plain @input="inputImageRenderer" />
        <!--/ upload button -->
        <b-card-text>Allowed JPG, GIF or PNG. Max size of 800kB</b-card-text>
      </b-media-body>
    </b-media>
    <!--/ media -->

    <!-- form -->
    <b-form class="mt-2">
      <b-row>

        <b-col sm="6">
          <b-form-group label="Title" label-for="title">
            <b-form-input v-model="currentStore.title" placeholder="Title" name="title" />
          </b-form-group>
        </b-col>

        <b-col sm="6">
          <b-form-group label="Description" label-for="description">
            <b-form-input v-model="currentStore.description" name="description" placeholder="Description" />
          </b-form-group>
        </b-col>

        <b-col sm="6">
          <b-form-group label="Store hours" label-for="store_hours">
            <b-form-input v-model="currentStore.store_hours" name="store_hours" placeholder="Store hours" id="store_hours"
            />
          </b-form-group>
        </b-col>

        <b-col sm="6">
          <b-form-group label="Категория" label-for="categoryId">
            <b-form-select v-model="currentStore.categoryId" :options="categories" value-field="id" text-field="title">
            </b-form-select>
          </b-form-group>
        </b-col>

        <b-col cols="12">
          <b-button v-ripple.400="'rgba(255, 255, 255, 0.15)'" variant="primary" class="mt-2 mr-1" @click="updateStore">
            Сохранить
          </b-button>
          <b-button v-ripple.400="'rgba(186, 191, 199, 0.15)'" variant="outline-secondary" type="reset" class="mt-2"
            @click="deleteStore">
            Удалить
          </b-button>
        </b-col>

      </b-row>
    </b-form>
  </b-card>
</template>

<script>
import StoreDataService from "../../services/StoreDataService"
import CategoryDataService from "../../services/CategoryDataService"
import { ref } from '@vue/composition-api'
import { useInputImageRenderer } from '@core/comp-functions/forms/form-utils'
import {
  BFormFile,
  BButton,
  BForm,
  BFormGroup,
  BFormInput,
  BRow,
  BCol,
  BAlert,
  BCard,
  BCardText,
  BMedia,
  BMediaAside,
  BMediaBody,
  BLink,
  BImg,
  BFormSelect,
  BFormSelectOption
} from 'bootstrap-vue'
import Ripple from 'vue-ripple-directive'

export default {
  name: "store_details",
  data() {
    return {
      blogEdit: {},
      currentStore: null,
      message: '',
      categories: [],
      image_path: 'http://localhost:8081/uploads/',
      image_name: null,

    };
  },

  components: {
    BButton,
    BForm,
    BImg,
    BFormFile,
    BFormGroup,
    BFormInput,
    BRow,
    BCol,
    BAlert,
    BCard,
    BCardText,
    BMedia,
    BMediaAside,
    BMediaBody,
    BLink,
    BFormSelect,
    BFormSelectOption
  },

  directives: {
    Ripple,
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

    getImg(e) {
      this.currentStore.image = e.target.files[0];
    },

    getStore(id) {
      StoreDataService.get(id)
        .then(response => {
          this.currentStore = response.data;
          const enc = new TextDecoder("utf-8");
          let image_data = response.data.image.data;
          let image_data_buffer = Buffer.from(image_data);
          this.image_name = enc.decode(image_data_buffer);
        })
        .catch(e => {
          console.log(e);
        });
    },

    updateStore() {
      const formData = new FormData();
      formData.append("image", this.currentStore.image);
      formData.append("title", this.currentStore.title);
      formData.append("description", this.currentStore.description);
      formData.append("store_hours", this.currentStore.store_hours);
      formData.append("categoryId", Number(this.currentStore.categoryId));

      StoreDataService.update(this.currentStore.id, formData)
        .then(response => {
          console.log(response.data);
          this.$router.push({ name: "store_details", params: { id: this.currentStore.id } });
        })
        .catch(e => {
          console.log(e);
        });
    },

    deleteStore() {
      StoreDataService.delete(this.currentStore.id)
        .then(response => {
          console.log(response.data);
          this.$router.push({ name: "stores_list" });
        })
        .catch(e => {
          console.log(e);
        });
    },
  },

  mounted() {
    this.retrieveCategories();
    this.message = '';
    this.getStore(this.$route.params.id);
  },

  setup() {
    const refInputEl = ref(null)
    const refPreviewEl = ref(null)

    const { inputImageRenderer } = useInputImageRenderer(refInputEl, base64 => { refPreviewEl.value.src = base64 })

    return {
      refInputEl,
      refPreviewEl,
      inputImageRenderer,
    }
  },
};
</script>

<style>
.edit-form {
  max-width: 300px;
  margin: auto;
}
</style>