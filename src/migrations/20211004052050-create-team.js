"use strict";
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("Teams", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      name: {
        type: Sequelize.STRING,
      },
      captainId: {
        type: Sequelize.NUMBER,
        references: {
          model: "User",
          key: "id",
        },
      },
      logo: {
        type: Sequelize.STRING,
      },
      tournamentId: {
        type: Sequelize.STRING,
        reference: {
          model: "Tournament",
          key: "id",
        },
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
    await queryInterface.dropTable("Teams");
  },
};
