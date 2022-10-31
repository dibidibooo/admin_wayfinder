<template>
  <b-card>
    <!-- form -->
    <b-form class="mt-2">
      <b-row>

        <b-col sm="6">
          <b-form-group label="Title" label-for="title">
            <b-form-input v-model="currentCategory.title" name="title" />
          </b-form-group>
        </b-col>

        <b-col cols="12 d-flex justify-content-between">
          <div>
            <b-button v-ripple.400="'rgba(255, 255, 255, 0.15)'" variant="primary" class="mt-2 mr-1" @click="updateCategory">
              Сохранить
            </b-button>
            <b-button v-ripple.400="'rgba(186, 191, 199, 0.15)'" variant="outline-secondary" type="reset" class="mt-2"
            :to="{ name: 'categories_list' }">
              Отменить
            </b-button>
          </div>
          <div>
            <b-button v-ripple.400="'rgba(186, 191, 199, 0.15)'" variant="outline-danger" type="reset" class="mt-2 mr-1"
              @click="deleteCategory">
              Удалить
            </b-button>
          </div>
        </b-col>

      </b-row>
    </b-form>
  </b-card>
</template>

<script>
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
  name: "category_details",
  data() {
    return {
      currentCategory: null,
      message: ''
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
          this.$router.push({ name: 'categories_list'});
          location.reload();
        })
        .catch(e => {
          console.log(e);
        });
    },

    deleteCategory() {
      CategoryDataService.delete(this.currentCategory.id)
        .then(response => {
          console.log(response.data);
          this.$router.push({ name: "categories_list" });
          location.reload();
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