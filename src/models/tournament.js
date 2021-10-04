"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Tournament extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Tournament.init(
    {
      title: DataTypes.STRING,
      start_date: DataTypes.DATE,
      end_date: DataTypes.DATE,
      team_count: DataTypes.NUMBER,
      slot: DataTypes.NUMBER,
    },
    {
      sequelize,
      modelName: "Tournament",
    }
  );
  return Tournament;
};
