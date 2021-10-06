"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class TeamMember extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ Team, User }) {
      this.belongsTo(Team, { foreignKey: "teamId" });
      this.belongsTo(User, { foreignKey: "userId", as: "user" });
    }
  }
  TeamMember.init(
    {
      userId: DataTypes.NUMBER,
      teamId: DataTypes.NUMBER,
      roles: { type: DataTypes.ENUM, values: ["CAPTAIN", "MEMBER", "STANDIN"] },
      ingameId: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "TeamMember",
    }
  );
  return TeamMember;
};
