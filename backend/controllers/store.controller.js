const db = require("../models");
const Store = db.store;
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
    if (req.file == undefined) {
        return res.send(`You must select a file.`);
    }

    // Save Store in the database
    Store.create({
        title: req.body.title,
        description: req.body.description,
        store_hours: req.body.store_hours,
        categoryId: req.body.categoryId,
        image: req.file.filename
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

    Store.findByPk(id, { include: ["category"] })
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

    let body = {
        title: req.body.title,
        description: req.body.description,
        store_hours: req.body.store_hours,
        categoryId: req.body.categoryId
    }
    if (req.file) {
        body.image = req.file.filename
    }

    Store.update(body, {
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