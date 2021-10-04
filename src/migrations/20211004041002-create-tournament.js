"use strict";
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable(
      "Tournaments",
      {
        id: {
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
          type: Sequelize.INTEGER,
        },
        title: {
          type: Sequelize.STRING,
        },
        start_date: {
          type: Sequelize.DATE,
        },
        end_date: {
          type: Sequelize.DATE,
        },
        team_count: {
          type: Sequelize.NUMBER,
        },
        slot: {
          type: Sequelize.NUMBER,
        },
        createdAt: {
          allowNull: false,
          type: Sequelize.DATE,
          name: "createdAt",
          field: "created_at",
        },
        updatedAt: {
          allowNull: false,
          type: Sequelize.DATE,
          name: "updatedAt",
          field: "updated_at",
        },
      },
      { timestamps: true, underscored: true }
    );
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable("Tournaments");
  },
};
