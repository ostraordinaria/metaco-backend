const express = require("express");
const { sequelize, Tournament } = require("./src/models");

const app = express();

app.get("/test", (req, res) => {
  res.status(200).json({ data: "hello world" });
});

app.get("/leaderboards", async (req, res) => {
  const tournaments = await Tournament.findAll();
  res.status(200).send({ data: tournaments });
});

app.listen(8888, async () => {
  console.log("Server is running");
  await sequelize.sync({ force: true });
  console.log("DB synced!");
});
