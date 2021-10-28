const { Sequelize } = require("sequelize");
require("dotenv").config();

const sequelize = new Sequelize("stonksdb", "postgres", "asdf12345", {
  host: "localhost",
  dialect: "postgres" /* one of 'mysql' | 'mariadb' | 'postgres' | 'mssql' */,
});
sequelize.sync();

async () => {
  try {
    await sequelize.authenticate();
    console.log("Connection with DB established successfully.");
  } catch (err) {
    console.error("Unable to connect DB.");
  }
};

module.exports = sequelize;
