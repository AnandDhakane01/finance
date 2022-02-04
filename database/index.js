const { Sequelize } = require("sequelize");
require("dotenv").config();

let sequelize;

if (process.env.ENVIRONMENT == "development") {
  console.log();
  console.log();
  console.log("in development");
  console.log();
  console.log();
  sequelize = new Sequelize("stonksdb", "postgres", "asdf12345", {
    host: "localhost",
    dialect: "postgres" /* one of 'mysql' | 'mariadb' | 'postgres' | 'mssql' */,
  });
} else {
  console.log();
  console.log();
  console.log("in production");
  console.log();
  console.log();
  sequelize = new Sequelize(process.env.POSTGRES_URI);
}

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
