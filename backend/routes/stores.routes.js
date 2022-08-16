module.exports = app => {
  const stores = require("../controllers/store.controller.js");
  let router = require("express").Router();
  const upload = require("../middleware/upload.js");

  // Create a new Store
  // router.post("/store", stores.create);
  router.post("/store", upload.single("file"), stores.create);
  
  // Retrieve all Stores
  router.get("/stores", stores.findAll);
  
  // Retrieve a single Store with id
  router.get("/store/:id", stores.findOne);
  
  // Update a Store with id
  router.put("/store/:id", stores.update);
  
  // Delete a Store with id
  router.delete("/store/:id", stores.delete);
  
  // Delete a all Stores
  router.delete("/stores", stores.deleteAll);
  
  app.use('/api', router);
};

// module.exports = app => {
//   const stores = require("../controllers/store.controller.js");
//   let router = require("express").Router();

//   // Create a new Store
//   router.post("/", stores.createStore);

//   // Create a new Category
//   router.post("/", stores.createCategory);
  
//   // Retrieve all Stores
//   router.get("/", stores.findAll);
  
//   // Retrieve a single Store with id
//   router.get("/:id", stores.findStoreById);
  
//   app.use('/api/stores', router);
// };

// module.exports = function (app) {

//   const stores = require('../controllers/store.controller.js');

//   // Create a new Store
//   app.post('/api/store', stores.create);

//   // Retrieve all Stores
//   app.get('/api/stores', stores.findAll);

//   // Retrieve a single Store by Id
//   app.get('/api/store/:id', stores.findByPk);

//   // Update a Store with Id
//   app.put('/api/store/:id', stores.update);

//   // Delete a Store with Id
//   app.delete('/api/store/:id', stores.delete);
// }