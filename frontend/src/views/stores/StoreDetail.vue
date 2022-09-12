<template>
  <b-card>
    <!-- media -->
    <b-media no-body>
      <b-media-aside>
        <b-img
          ref="refPreviewEl"
          :src="image_path + image_name"
          rounded
          height="80"
        />
      </b-media-aside>
    </b-media>
    <!--/ media -->

    <!-- form -->
    <b-form class="mt-2">
      <b-row>
        
        <b-col sm="6">
          <b-form-group
            label="Title"
            label-for="title"
          >
            <p id="title">{{ currentStore.title }}</p>
          </b-form-group>
        </b-col>
        
        <b-col sm="6">
          <b-form-group
            label="Description"
            label-for="description"
          >
            <p id="description">{{ currentStore.description }}</p>
          </b-form-group>
        </b-col>
        
        <b-col sm="6">
          <b-form-group
            label="Store hours"
            label-for="store_hours"
          >
            <p id="store_hours">{{ currentStore.store_hours }}</p>
          </b-form-group>
        </b-col>
        
        <b-col sm="6">
          <b-form-group
            label="Категория"
            label-for="categoryId"
          >
            <p id="categoryId" v-if="currentStore.categoryId">{{ currentStore.category.title }}</p>
            <p v-else>Нет категории</p>
          </b-form-group>
        </b-col>

        <b-col cols="12">
          <b-button
            v-ripple.400="'rgba(255, 255, 255, 0.15)'"
            variant="primary"
            class="mt-2 mr-1"
            :to="{ name: 'store_update', params: { id: currentStore.id } }"
          >
            Редактировать
          </b-button>
          <b-button
            v-ripple.400="'rgba(186, 191, 199, 0.15)'"
            variant="outline-secondary"
            type="reset"
            class="mt-2"
            :to="{ name: 'stores_list' }"
          >
            Назад
          </b-button>
        </b-col>

      </b-row>
    </b-form>
  </b-card>
</template>

<script>
import StoreDataService from "../../services/StoreDataService";
import CategoryDataService from "../../services/CategoryDataService";

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
      currentStore: null,
      message: '',
      categories: [],
      image_path: 'http://localhost:8081/uploads/',
      image_name: null
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

    getStore(id) {
      StoreDataService.get(id)
        .then(response => {
          this.currentStore = response.data;
          console.log('Response data:', response.data);

          const enc = new TextDecoder("utf-8");
          let image_data = response.data.image.data;
          let image_data_buffer = Buffer.from(image_data);
          this.image_name = enc.decode(image_data_buffer);
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
    }
  },
  mounted() {
    this.retrieveCategories();
    this.message = '';
    this.getStore(this.$route.params.id);
  }
};
</script>

<style>
.edit-form {
  max-width: 300px;
  margin: auto;
}
</style>