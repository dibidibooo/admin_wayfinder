<template>
  <div v-if="currentStore" class="edit-form">
    <h4>Бутик</h4>
    <form enctype="multipart/form-data" method="POST" id="my_form">
      <div class="form-group">
        <label for="title">Название</label>
        <input type="text" class="form-control" id="title" v-model="currentStore.title" />
      </div>
      <div class="form-group">
        <label for="description">Описание</label>
        <input type="text" class="form-control" id="description" v-model="currentStore.description" />
      </div>

      <div class="form-group">
        <label for="store_hours">Часы работы</label>
        <input type="text" class="form-control" id="store_hours" v-model="currentStore.store_hours" />
      </div>

      <div class="form-group">
        <label for="categoryId">Категория</label>
        <select class="form-select" name="categoryId" id="categoryId" v-model="currentStore.categoryId">
          <option v-for="cat in categories" v-bind:value="cat.id" :key="cat.id">{{ cat.title }}</option>
        </select>
      </div>

      <div class="form-group">
        <label for="image">Логотип</label>
        <input class="form-control" type="file" name="image" accept=".jpg, .png, .gif, .jpeg" @change="getImg">
      </div>
      <img v-bind:src="image_path + image_name" alt="Logo" id="image" width="150">
    </form>

    <div class="mt-3">
      <button type="submit" class="btn btn-success" @click="updateStore">
        Сохранить
      </button>

      <button class="btn btn-danger ml-2" @click="deleteStore">
        Удалить
      </button>
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
          this.$router.push({ name: "apps-users-list" });
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