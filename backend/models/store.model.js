module.exports = (sequelize, Sequelize) => {
    const Store = sequelize.define("store", {
      title: {
        type: Sequelize.STRING
      },
      description: {
        type: Sequelize.STRING
      },
      store_hours: {
        type: Sequelize.STRING
      },
      image: {
        type: Sequelize.STRING
      },
    });
    return Store;
  };