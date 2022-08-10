const db = require("../models");
const Store = db.store;
const Category = db.category;
const Op = db.Sequelize.Op;

// Create and Save a new Store
exports.create = (req, res) => {
    // Validate request
    if (!req.body.title) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
        return;
    }

    // Save Store in the database
    Store.create({
        title: req.body.title,
        description: req.body.description,
        store_hours: req.body.store_hours,
        categoryId: req.body.categoryId
    })
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while creating the Store."
            });
        });
};

// Retrieve all Stores from the database.
exports.findAll = (req, res) => {
    const title = req.query.title;
    let condition = title ? { title: { [Op.iLike]: `%${title}%` } } : null;

    Store.findAll({ 
        where: condition,
        include: ["category"]
    })
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving stores."
            });
        });
};

// Find a single Store with an id
exports.findOne = (req, res) => {
    const id = req.params.id;

    Store.findByPk(id, {include: ["category"]})
        .then(data => {
            if (data) {
                res.send(data);
            } else {
                res.status(404).send({
                    message: `Cannot find Store with id=${id}.`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error retrieving Store with id=" + id
            });
        });
};

// Update a Store by the id in the request
exports.update = (req, res) => {
    const id = req.params.id;

    Store.update(req.body, {
        where: { id: id }
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "Store was updated successfully."
                });
            } else {
                res.send({
                    message: `Cannot update Store with id=${id}. Maybe Store was not found or req.body is empty!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error updating Store with id=" + id
            });
        });
};

// Delete a Store with the specified id in the request
exports.delete = (req, res) => {
    const id = req.params.id;

    Store.destroy({
        where: { id: id }
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "Store was deleted successfully!"
                });
            } else {
                res.send({
                    message: `Cannot delete Store with id=${id}. Maybe Store was not found!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Could not delete Store with id=" + id
            });
        });
};

// Delete all Stores from the database.
exports.deleteAll = (req, res) => {
    Store.destroy({
        where: {},
        truncate: false
    })
        .then(nums => {
            res.send({ message: `${nums} Stores were deleted successfully!` });
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while removing all stores."
            });
        });
};

// const db = require("../models");
// const Category = db.category;
// const Store = db.store;

// // Create and Save new categories
// exports.createCategory = (category) => {
//   return Category.create({
//     title: category.title
//   })
//     .then((category) => {
//       console.log(">> Created category: " + JSON.stringify(category, null, 4));
//       return category;
//     })
//     .catch((err) => {
//       console.log(">> Error while creating category: ", err);
//     });
// };

// // Create and Save new Stores
// exports.createStore = (categoryId, store) => {
//   return Store.create({
//     title: store.title,
//     description: store.description,
//     store_hours: store.store_hours,
//     categoryId: categoryId,
//   })
//     .then((store) => {
//       console.log(">> Created store: " + JSON.stringify(store, null, 4));
//       return store;
//     })
//     .catch((err) => {
//       console.log(">> Error while creating store: ", err);
//     });
// };

// // Get the stores for a given category
// exports.findCategoryById = (categoryId) => {
//   return Category.findByPk(categoryId, { include: ["stores"] })
//     .then((category) => {
//       return category;
//     })
//     .catch((err) => {
//       console.log(">> Error while finding category: ", err);
//     });
// };

// // Get the stores for a given store id
// exports.findStoreById = (id) => {
//   return Store.findByPk(id, { include: ["category"] })
//     .then((store) => {
//       return store;
//     })
//     .catch((err) => {
//       console.log(">> Error while finding store: ", err);
//     });
// };

// // Get all Categories include stores
// exports.findAll = () => {
//   return Store.findAll({
//     include: ["categories"],
//   }).then((categories) => {
//     return categories;
//   });
// };

// const db = require('../models/index.js');
// const Store = db.store;

// // Post a Store
// exports.create = (req, res) => {
//     // Save to database
//     Store.create({
//         title: req.body.title,
//         description: req.body.description,
//         store_hours: req.body.store_hours
//     }).then(store => {
//         // Send created Store to client
//         res.send(store);
//     }).catch(err => {
//         res.status(500).send("Error -> " + err);
//     })
// };

// // FETCH all stores
// exports.findAll = (req, res) => {
//     Store.findAll().then(stores => {
//         // Send all customers to Client
//         res.send(stores);
//     }).catch(err => {
//         res.status(500).send("Error -> " + err);
//     })
// };

// // Find a Store by Id
// exports.findByPk = (req, res) => {
//     Store.findByPk(req.params.id)
//     .then(store => {
//         res.send(store);
//     }).catch(err => {
//         res.status(500).send("Error -> " + err);
//     })
// };

// // Update a Store
// exports.update = (req, res) => {
//     let store = req.body;
//     const id = req.params.id;
//     Store.update({ title: store.title },
//         { where: { id: id } }
//     ).then(() => {
//         res.status(200).send(store);
//     }).catch(err => {
//         res.status(500).send("Error -> " + err);
//     })
// };

// // Delete a Store by Id
// exports.delete = (req, res) => {
//     const id = req.params.id;
//     Store.destroy({
//         where: { id: id }
//     }).then(() => {
//         res.status(200).send('Store has been deleted!');
//     }).catch(err => {
//         res.status(500).send("Error -> " + err);
//     });
// };