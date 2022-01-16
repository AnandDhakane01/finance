const { DataTypes } = require("sequelize");
const sequelize = require("../database/index");

const Stock = sequelize.define("stocks", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  user_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: "users",
      key: "id",
    },
  },
  no_of_shares: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
});

module.exports = Stock;
