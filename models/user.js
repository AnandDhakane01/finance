const { DataTypes } = require("sequelize");
const sequelize = require("../database/index");

const User = sequelize.define("user", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  userName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  cash: {
    type: DataTypes.FLOAT,
    defaultValue: 10000.0,
  },
  password: {
    type: DataTypes.STRING,
  },
  googleUserId: {
    type: DataTypes.STRING,
  },
  profilePic: {
    type: DataTypes.STRING,
  },
});

module.exports = User;
