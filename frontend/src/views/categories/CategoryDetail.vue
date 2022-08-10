<template>
  <div v-if="currentCategory" class="edit-form">
    <h4>Category</h4>
    <form>
      <div class="form-group">
        <label for="title">Title</label>
        <input type="text" class="form-control" id="title"
          v-model="currentCategory.title"
        />
      </div>
    </form>

    <div class="mt-3">
      <button class="btn btn-danger me-2"
        @click="deleteCategory">
        Delete
      </button>

      <button type="submit" class="btn btn-success"
        @click="updateCategory">
        Update
      </button>
    </div>
    <p>{{ message }}</p>
  </div>

  <div v-else>
    <br />
    <p>Please click on a Category...</p>
  </div>
</template>

<script>
import CategoryDataService from "../../services/CategoryDataService";

export default {
  name: "category_details",
  data() {
    return {
      currentCategory: null,
      message: ''
    };
  },
  methods: {
    getCategory(id) {
      CategoryDataService.get(id)
        .then(response => {
          this.currentCategory = response.data;
          console.log(response.data);
        })
        .catch(e => {
          console.log(e);
        });
    },

    updateCategory() {
      CategoryDataService.update(this.currentCategory.id, this.currentCategory)
        .then(response => {
          console.log(response.data);
          this.message = 'The Category was updated successfully!';
        })
        .catch(e => {
          console.log(e);
        });
    },

    deleteCategory() {
      CategoryDataService.delete(this.currentCategory.id)
        .then(response => {
          console.log(response.data);
          this.$router.push({ name: "categories" });
        })
        .catch(e => {
          console.log(e);
        });
    }
  },
  mounted() {
    this.message = '';
    this.getCategory(this.$route.params.id);
  }
};
</script>

<style>
.edit-form {
  max-width: 300px;
  margin: auto;
}
</style>

<!-- <template>
  <div v-if="this.category">
    <h4>Category</h4>
    <form>
      <div class="form-group">
        <label for="title">Title: </label>
        {{ this.category.title }}
      </div>
    </form>

    <span class="btn btn-danger" @click="deleteCategory()">
      Delete
    </span>
    <button type="submit" class="btn btn-success"
      @click="updateCategory">
      Update
    </button>
  </div>
  <div v-else>
    <br>
    <p>Please click on a Category...</p>
  </div>
</template>

<script>
import http from "../../http-common";

export default {
  name: "category_detail",
  props: ["category"],
  methods: {
    /* eslint-disable no-console */

    deleteCategory() {
      http
        .delete("/category/" + this.category.id)
        .then(response => {
          console.log(response.data);
          this.$emit("refreshData");
          this.$router.push('/categories');
        })
        .catch(e => {
          console.log(e);
        });
    },

    updateCategory() {
      let data = {
        title: this.category.title
      }
      http
        .put("/category/" + this.category.id, data)
        .then(response => {
          console.log(response.data);
          this.message = 'The Category was updated successfully!';
        })
        .catch(e => {
          console.log(e);
        });
    },

    /* eslint-enable no-console */
  }
};
</script> -->