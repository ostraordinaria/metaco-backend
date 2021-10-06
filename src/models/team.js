"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Team extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ Tournament, TournamentResult, TeamMember }) {
      this.belongsTo(Tournament, {
        foreignKey: "tournamentId",
      });
      this.hasMany(TournamentResult, {
        foreignKey: "teamId",
      });
      this.hasMany(TeamMember, { foreignKey: "teamId", as: "teamMembers" });
    }
  }
  Team.init(
    {
      name: DataTypes.STRING,
      captainId: DataTypes.NUMBER,
      logo: DataTypes.STRING,
      tournamentId: DataTypes.NUMBER,
    },
    {
      sequelize,
      modelName: "Team",
    }
  );
  return Team;
};
