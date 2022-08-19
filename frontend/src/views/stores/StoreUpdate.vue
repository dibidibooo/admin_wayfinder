<template>
  <div v-if="currentStore" class="edit-form">
    <h4>Store</h4>
    <form enctype="multipart/form-data" method="POST">
      <div class="form-group">
        <label for="title">Title</label>
        <input type="text" class="form-control" id="title" v-model="currentStore.title" />
      </div>
      <div class="form-group">
        <label for="description">Description</label>
        <input type="text" class="form-control" id="description" v-model="currentStore.description" />
      </div>

      <div class="form-group">
        <label for="store_hours">Store hours</label>
        <input type="text" class="form-control" id="store_hours" v-model="currentStore.store_hours" />
      </div>

      <div class="form-group">
        <label for="categoryId">Category</label>
        <select class="form-select" name="categoryId" id="categoryId" v-model="currentStore.categoryId">
          <option v-for="cat in categories" v-bind:value="cat.id" :key="cat.id">{{ cat.title }}</option>
        </select>
      </div>

      <div class="form-group">
        <label for="image">Logo</label>
        <img v-bind:src="image_path + image_name" alt="Logo" id="image" width="300">
        <input type="file" name="image">
      </div>
    </form>

    <div class="mt-3">
      <button type="submit" class="btn btn-success" @click="updateStore">
        Update
      </button>

      <button class="btn btn-danger ml-2" @click="deleteStore">
        Delete
      </button>
    </div>
    <p>{{ message }}</p>
  </div>

  <div v-else>
    <br />
    <p>Please click on a Store...</p>
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

    updateStore() {
      StoreDataService.update(this.currentStore.id, this.currentStore)
        .then(response => {
          console.log(response.data);
          this.message = 'The store was updated successfully!';
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