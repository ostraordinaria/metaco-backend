"use strict";
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("TeamMembers", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      userId: {
        type: Sequelize.NUMBER,
        references: {
          model: "User",
          key: "id",
        },
      },
      teamId: {
        type: Sequelize.NUMBER,
        references: {
          model: "Team",
          key: "id",
        },
      },
      roles: {
        type: Sequelize.ENUM,
        values: ["CAPTAIN", "MEMBER", "STANDIN"],
      },
      ingameId: {
        type: Sequelize.STRING,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable("TeamMembers");
  },
};
