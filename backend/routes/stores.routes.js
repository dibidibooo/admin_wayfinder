module.exports = app => {
  const stores = require("../controllers/store.controller.js");
  let router = require("express").Router();
  const upload = require("../middleware/upload.js");

  // Create a new Store
  router.post("/store", upload.single("image"), stores.create);
  
  // Retrieve all Stores
  router.get("/stores", stores.findAll);
  
  // Retrieve a single Store with id
  router.get("/store/:id", stores.findOne);
  
  // Update a Store with id
  router.put("/store/:id", upload.single("image"), stores.update);
  
  // Delete a Store with id
  router.delete("/store/:id", stores.delete);
  
  // Delete a all Stores
  router.delete("/stores", stores.deleteAll);
  
  app.use('/api', router);
};