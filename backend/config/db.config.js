module.exports = {
    HOST: "localhost",
    USER: "postgres",
    PASSWORD: "Alaska_71749809",
    DB: "adp_db",
    dialect: "postgres",
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000
    }
  };