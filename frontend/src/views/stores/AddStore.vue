<template>
  <div class="submit-form">
    <div v-if="!submitted">
      <div class="form-group">
        <label for="title">Title</label>
        <input
          type="text"
          class="form-control"
          id="title"
          required
          v-model="store.title"
          name="title"
        />
      </div>
      <div class="form-group">
        <label for="description">Description</label>
        <input
          class="form-control"
          id="description"
          required
          v-model="store.description"
          name="description"
        />
      </div>
      <div class="form-group">
        <label for="store_hours">Store hours</label>
        <input
          class="form-control"
          id="store_hours"
          required
          v-model="store.store_hours"
          name="store_hours"
        />
      </div>
      
      <div>
        <label for="categoryId">Category</label>
        <select class="form-select" name="categoryId" id="categoryId" v-model="store.categoryId">
          <option disabled value="">Choose category...</option>
          <option v-for="cat in categories" v-bind:value="cat.id" :key="cat.id">{{ cat.title }}</option>
        </select>
      </div>
      <button @click="saveStore" class="btn btn-success">Submit</button>
    </div>
    
    <div v-else>
      <h4>You submitted successfully!</h4>
      <button class="btn btn-success" @click="newStore">Add</button>
    </div>
  </div>
</template>

<script>
import StoreDataService from "../../services/StoreDataService";
import CategoryDataService from "../../services/CategoryDataService";

export default {
  name: "add_store",
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
      categories: []
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
  }
};
</script>

<style>
.submit-form {
  max-width: 300px;
  margin: auto;
}
</style>