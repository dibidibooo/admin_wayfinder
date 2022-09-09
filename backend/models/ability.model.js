module.exports = (sequelize, Sequelize) => {
  const Ability = sequelize.define("Ability", {
    action: {
      type: Sequelize.STRING,
      defaultValue: "read"
    },
    subject: {
      type: Sequelize.STRING
    }
  });
  return Ability;
}