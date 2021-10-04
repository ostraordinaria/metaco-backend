"use strict";
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("TournamentResults", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      teamId: {
        type: Sequelize.NUMBER,
        references: {
          model: "Team",
          key: "id",
        },
      },
      position: {
        type: Sequelize.NUMBER,
      },
      point: {
        type: Sequelize.NUMBER,
      },
      tournamentId: {
        type: Sequelize.NUMBER,
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
    await queryInterface.dropTable("TournamentResults");
  },
};
