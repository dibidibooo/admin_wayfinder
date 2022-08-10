<template>
  <div class="list row">
    <div class="col-md-8">
      <div class="input-group mb-3">
        <input type="text" class="form-control" placeholder="Search by title" v-model="title" />
        <div class="input-group-append">
          <button class="btn btn-outline-secondary" type="button" @click="searchTitle">
            Search
          </button>
        </div>
      </div>
    </div>

    <div class="col-md-6">
      <h4>Stores List</h4>
      <ul class="list-group">
        <li class="list-group-item" 
          :class="{ active: index == currentIndex }" 
          v-for="(store, index) in stores"
          :key="index" 
          @click="setActiveStore(store, index)"
        >
          <div @click="redirectToStoreDetails">{{ store.title }}</div>
        </li>
      </ul>
      
      <button class="btn btn-sm btn-danger mt-3" @click="removeAllStores">
        Remove All
      </button>
    </div>
    
    <div class="col-md-6">
      <div v-if="currentStore">
        <h4>Store</h4>
        <div>
          <label><strong>Title:</strong></label> {{ currentStore.title }}
        </div>
        <div>
          <label><strong>Description:</strong></label> {{ currentStore.description }}
        </div>
        <div>
          <label><strong>Store hours:</strong></label> {{ currentStore.store_hours }}
        </div>
        <div>
          <label><strong>Category:</strong></label> {{ currentStore.category.title }}
        </div>

        <router-link :to="'/store/' + currentStore.id" class="badge badge-warning">Edit</router-link>
      </div>
      <div v-else>
        <br />
        <p>Please click on a Store...</p>
      </div>
    </div>
  </div>
</template>

<script>
import StoreDataService from "../../services/StoreDataService";

export default {
  name: "stores_list",
  data() {
    return {
      stores: [],
      currentStore: null,
      currentIndex: -1,
      title: ""
    };
  },

  methods: {
    retrieveStores() {
      StoreDataService.getAll()
        .then(response => {
          this.stores = response.data;
          console.log(response.data);
        })
        .catch(e => {
          console.log(e);
        });
    },

    refreshList() {
      this.retrieveStores();
      this.currentStore = null;
      this.currentIndex = -1;
    },

    setActiveStore(store, index) {
      this.currentStore = store;
      this.currentIndex = index;
    },

    removeAllStores() {
      StoreDataService.deleteAll()
        .then(response => {
          console.log(response.data);
          this.refreshList();
        })
        .catch(e => {
          console.log(e);
        });
    },

    searchTitle() {
      StoreDataService.findByTitle(this.title)
        .then(response => {
          this.stores = response.data;
          console.log(response.data);
        })
        .catch(e => {
          console.log(e);
        });
    },

    redirectToStoreDetails() {
      this.$router.push({ name: 'store_details', params: { id: this.currentStore.id } });
    }
  },

  mounted() {
    this.retrieveStores();
  }
};
</script>

<style>
.list {
  text-align: left;
  max-width: 750px;
  margin: auto;
}
</style>