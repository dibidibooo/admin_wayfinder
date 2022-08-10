module.exports = app => {
  const categories = require("../controllers/category.controller.js");
  let router = require("express").Router();

  // Create a new Category
  router.post("/category", categories.create);

  // Retrieve all Categories
  router.get("/categories", categories.findAll);

  // Retrieve a single Category with id
  router.get("/category/:id", categories.findOne);

  // Update a Category with id
  router.put("/category/:id", categories.update);

  // Delete a Category with id
  router.delete("/category/:id", categories.delete);

  // Delete a all Categories
  router.delete("/categories", categories.deleteAll);

  app.use('/api', router);
};


// module.exports = function (app) {

//   const categories = require('../controllers/category.controller.js');

//   // Create a new Customer
//   app.post('/api/category', categories.create);

//   // Retrieve all Customer
//   app.get('/api/categories', categories.findAll);

//   // Retrieve a single Customer by Id
//   app.get('/api/category/:id', categories.findByPk);

//   // Update a Customer with Id
//   app.put('/api/category/:id', categories.update);

//   // Delete a Customer with Id
//   app.delete('/api/category/:id', categories.delete);
// }