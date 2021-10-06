"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class TournamentResult extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ Team, Tournament }) {
      this.belongsTo(Team, { foreignKey: "teamId", as: "team" });
      this.belongsTo(Tournament, { foreignKey: "tournamentId" });
    }
  }
  TournamentResult.init(
    {
      teamId: DataTypes.NUMBER,
      position: DataTypes.NUMBER,
      point: DataTypes.NUMBER,
      tournamentId: DataTypes.NUMBER,
    },
    {
      sequelize,
      modelName: "TournamentResult",
    }
  );
  return TournamentResult;
};
