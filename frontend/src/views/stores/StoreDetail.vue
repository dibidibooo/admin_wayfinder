<template>
  <div v-if="currentStore" class="edit-form">
    <h4>Бутик</h4>
    <form>
      <div class="form-group">
        <label for="title">Название</label>
        <p>{{ currentStore.title }}</p>
      </div>
      <div class="form-group">
        <label for="description">Описание</label>
        <p>{{ currentStore.description }}</p>
      </div>

      <div class="form-group">
        <label for="store_hours">Часы работы</label>
        <p>{{ currentStore.store_hours }}</p>
      </div>

      <div class="form-group">
        <label for="categoryId">Категория</label>
        <p v-if="currentStore.categoryId">{{ currentStore.category.title }}</p>
        <p v-else>Нет категории</p>
      </div>

      <div class="form-group">
        <label for="image">Логотип</label>
        <img v-bind:src="image_path + image_name" alt="Logo" id="image" name="image" width="300">
      </div>
    </form>

    <div class="mt-3">
      <b-link :to="{ name: 'store_update', params: { id: currentStore.id } }"
        class="btn btn-success" >
        Редактировать
      </b-link>
      <b-link :to="{ name: 'stores_list' }"
        class="btn btn-light ml-2" >
        Назад
      </b-link>
    </div>
    <p>{{ message }}</p>
  </div>

  <div v-else>
    <br />
    <p>Ошибка загрузки данных...</p>
  </div>
</template>

<script>
import StoreDataService from "../../services/StoreDataService";
import CategoryDataService from "../../services/CategoryDataService";

import {
  BCard, BRow, BCol, BFormInput, BButton, BTable, BMedia, BAvatar, BLink,
  BBadge, BDropdown, BDropdownItem, BPagination,
} from 'bootstrap-vue'

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
    BLink
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
          let logotype = response.data.image.data;
          let c = Buffer.from(logotype);
          this.image_name = enc.decode(c);
        })
        .catch(e => {
          console.log(e);
        });
    },

    deleteStore() {
      StoreDataService.delete(this.currentStore.id)
        .then(response => {
          console.log(response.data);
          this.$router.push({ name: "apps-users-list" });
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