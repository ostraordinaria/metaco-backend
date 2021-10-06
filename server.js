const express = require("express");
const cors = require("cors");
const {
  sequelize,
  Tournament,
  User,
  Team,
  TeamMember,
  TournamentResult,
} = require("./src/models");

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.get("/test", (req, res) => {
  res.status(200).json({ data: "hello world" });
});

app.get("/leaderboards", async (req, res) => {
  const tournaments = await Tournament.findAll({
    attributes: { exclude: ["createdAt", "updatedAt"] },
    include: [
      {
        model: Team,
        as: "teams",
        attributes: ["id", "name"],
      },
      {
        model: TournamentResult,
        as: "tournamentResults",
        attributes: ["teamId", "position", "point", "tournamentId"],
      },
    ],
    order: ["id"],
  });
  res.status(200).send({ data: tournaments });
});

app.get("/teams/:tournamentId", async (req, res) => {
  const { tournamentId } = req.params;

  try {
    if (!tournamentId) {
      return res.status(403).statusMessage("No tournament id is given");
    }
    const teams = await Team.findAll({ where: { tournamentId } });
    res.status(200).send({ data: teams });
  } catch (error) {
    res.status(500);
  }
});

app.put("/tournament-results/:tournamentId", async (req, res) => {
  const { tournamentId } = req.params;
  const { winners } = req.body;

  const tournamentResults = await TournamentResult.findAll({
    where: { tournamentId },
    order: ["position"],
    include: [
      {
        model: Team,
        as: "team",
        include: [
          {
            model: TeamMember,
            as: "teamMembers",
            include: [{ model: User, as: "user" }],
          },
        ],
      },
    ],
  });

  const REWARDS = {
    1: 5,
    2: 3,
    3: 2,
  };
  for (const [index, winner] of winners.entries()) {
    const result = tournamentResults.find(
      ({ teamId }) => tournamentId === teamId
    );

    if (!result && winner) {
      const team = await Team.findOne({
        where: { id: winner },
        include: [
          {
            model: TeamMember,
            as: "teamMembers",
          },
        ],
      });
      for (const teamMember of team.teamMembers) {
        await User.increment(
          { coin: +(REWARDS[index + 1] || 0) },
          { where: { id: teamMember.userId } }
        );
      }
      await TournamentResult.findOrCreate({
        where: { teamId: team.id, tournamentId },
        defaults: {
          teamId: team.id,
          position: index + 1,
          point: REWARDS[index + 1] || 0,
          tournamentId,
        },
      });
    }
  }
  res.status(200).send(tournamentResults);
});

app.get("/explorer", async (req, res) => {
  try {
    const users = await User.findAll({
      order: [["coin", "desc"]],
    });
    res.status(200).send({ data: users });
  } catch (error) {
    res.status(500);
  }
});

app.listen(8888, async () => {
  console.log("Server is running");
  await sequelize.sync();
  console.log("DB synced!");
});
