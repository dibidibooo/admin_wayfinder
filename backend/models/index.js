const dbConfig = require("../config/db.config.js");

const Sequelize = require("sequelize");
const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: dbConfig.dialect,
  operatorsAliases: 0,
  pool: {
    max: dbConfig.pool.max,
    min: dbConfig.pool.min,
    acquire: dbConfig.pool.acquire,
    idle: dbConfig.pool.idle
  }
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.category = require("./category.model.js")(sequelize, Sequelize);
db.store = require("./store.model.js")(sequelize, Sequelize);

db.category.hasMany(db.store, { 
  foreignKey: "categoryId",
  as: "stores",
  onDelete: "CASCADE"
});
db.store.belongsTo(db.category, {
    foreignKey: "categoryId",
    as: "category",
});

module.exports = db;