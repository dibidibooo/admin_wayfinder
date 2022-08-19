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