const { Sequelize } = require("sequelize");
require("dotenv").config();

let sequelize;

if (process.env.ENVIRONMENT == "development") {
  sequelize = new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USERNAME,
    process.env.DB_PASSWORD,
    {
      host: process.env.DB_HOST,
      dialect:
        "postgres" /* one of 'mysql' | 'mariadb' | 'postgres' | 'mssql' */,
    }
  );
} else {
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
