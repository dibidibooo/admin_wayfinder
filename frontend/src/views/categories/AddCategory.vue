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
          v-model="category.title"
          name="title"
        />
      </div>

      <button @click="saveCategory" class="btn btn-success">Submit</button>
    </div>
    
    <div v-else>
      <h4>You submitted successfully!</h4>
      <button class="btn btn-success" @click="newCategory">Add</button>
    </div>
  </div>
</template>

<script>
import CategoryDataService from "../../services/CategoryDataService";

export default {
  name: "add_category",
  data() {
    return {
      category: {
        id: null,
        title: ""
      },
      submitted: false
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
          this.submitted = true;
        })
        .catch(e => {
          console.log(e);
        });
    },
    
    newCategory() {
      this.submitted = false;
      this.category = {};
    }
  }
};
</script>

<style>
.submit-form {
  max-width: 300px;
  margin: auto;
}
</style>

<!-- <template>
  <div class="submitform">
    <div v-if="!submitted">
      <div class="form-group">
        <label for="title">Title</label>
        <input type="text" class="form-control" id="title" required="" v-model="category.title" name="title">
      </div>

      <button v-on:click="saveCategory" class="btn btn-success">Submit</button>
    </div>

    <div v-else>
      <h4>You submitted successfully!</h4>
      <button class="btn btn-success" v-on:click="newCategory">Add</button>
    </div>
  </div>
</template>

<script>
import http from "../../http-common";

export default {
  name: "add-category",
  data() {
    return {
      category: {
        id: 0,
        name: "",
        age: 0,
        active: false
      },
      submitted: false
    };
  },
  methods: {
    /* eslint-disable no-console */
    saveCategory() {
      var data = {
        title: this.category.title
      };

      http
        .post("/category", data)
        .then(response => {
          this.category.id = response.data.id;
          console.log(response.data);
        })
        .catch(e => {
          console.log(e);
        });

      this.submitted = true;
    },
    newCategory() {
      this.submitted = false;
      this.category = {};
    }
    /* eslint-enable no-console */
  }
};
</script>

<style>
.submitform {
  max-width: 300px;
  margin: auto;
}
</style> -->