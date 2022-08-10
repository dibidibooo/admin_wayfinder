const db = require("../models");
const Category = db.category;
const Store = db.store;
const Op = db.Sequelize.Op;

// Create and Save a new Category
exports.create = (req, res) => {
    // Validate request
    if (!req.body.title) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
        return;
    }

    // Create a Category
    const category = {
        title: req.body.title
    };

    // Save Category in the database
    Category.create(category)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while creating the Category."
            });
        });
};

// Retrieve all Categories from the database.
exports.findAll = (req, res) => {
    const title = req.query.title;
    let condition = title ? { title: { [Op.iLike]: `%${title}%` } } : null;

    Category.findAll({ 
        where: condition,
        include: ["stores"]
    })
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving categories."
            });
        });
};

// Find a single Category with an id
exports.findOne = (req, res) => {
    const id = req.params.id;

    Category.findByPk(id)
        .then(data => {
            if (data) {
                res.send(data);
            } else {
                res.status(404).send({
                    message: `Cannot find Category with id=${id}.`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error retrieving Category with id=" + id
            });
        });
};

// Update a Category by the id in the request
exports.update = (req, res) => {
    const id = req.params.id;

    Category.update(req.body, {
        where: { id: id }
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "Category was updated successfully."
                });
            } else {
                res.send({
                    message: `Cannot update Category with id=${id}. Maybe Category was not found or req.body is empty!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error updating Category with id=" + id
            });
        });
};

// Delete a Category with the specified id in the request
exports.delete = (req, res) => {
    const id = req.params.id;

    Category.destroy({
        where: { id: id }
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "Category was deleted successfully!"
                });
            } else {
                res.send({
                    message: `Cannot delete Category with id=${id}. Maybe Category was not found!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Could not delete Category with id=" + id
            });
        });
};

// Delete all Categories from the database.
exports.deleteAll = (req, res) => {
    Category.destroy({
        where: {},
        truncate: false
    })
        .then(nums => {
            res.send({ message: `${nums} Categories were deleted successfully!` });
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while removing all Categories."
            });
        });
};

// const db = require('../models/index.js');
// const Category = db.category;

// // Post a Category
// exports.create = (req, res) => {
//     // Save to database
//     Category.create({
//         title: req.body.title,
//     }).then(category => {
//         // Send created category to client
//         res.send(category);
//     }).catch(err => {
//         res.status(500).send("Error -> " + err);
//     })
// };

// // FETCH all Categories
// exports.findAll = (req, res) => {
//     Category.findAll().then(categories => {
//         // Send all customers to Client
//         res.send(categories);
//     }).catch(err => {
//         res.status(500).send("Error -> " + err);
//     })
// };

// // Find a Category by Id
// exports.findByPk = (req, res) => {
//     Category.findByPk(req.params.id)
//     .then(category => {
//         res.send(category);
//     }).catch(err => {
//         res.status(500).send("Error -> " + err);
//     })
// };

// // Update a Category
// exports.update = (req, res) => {
//     let category = req.body;
//     const id = req.params.id;
//     Category.update({ title: category.title },
//         { where: { id: id } }
//     ).then(() => {
//         res.status(200).send(category);
//     }).catch(err => {
//         res.status(500).send("Error -> " + err);
//     })
// };

// // Delete a Category by Id
// exports.delete = (req, res) => {
//     const id = req.params.id;
//     Category.destroy({
//         where: { id: id }
//     }).then(() => {
//         res.status(200).send('Category has been deleted!');
//     }).catch(err => {
//         res.status(500).send("Error -> " + err);
//     });
// };