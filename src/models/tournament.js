"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Tournament extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ Team, TournamentResult }) {
      this.hasMany(Team, { foreignKey: "tournamentId", as: "teams" });
      this.hasMany(TournamentResult, {
        foreignKey: "tournamentId",
        as: "tournamentResults",
      });
    }
  }
  Tournament.init(
    {
      title: DataTypes.STRING,
      startDate: DataTypes.DATE,
      endDate: DataTypes.DATE,
      teamCount: DataTypes.NUMBER,
      slot: DataTypes.NUMBER,
    },
    {
      sequelize,
      modelName: "Tournament",
    }
  );
  return Tournament;
};
