// load .env data into process.env
const environment = require("dotenv").config();

// Web server config
const PORT = process.env.PORT || 4000;
const express = require("express");
const app = express();
const morgan = require("morgan");

const { Pool } = require("pg");
const dbParams = require("./lib/db.js");

const { getUserById, addCharacter, patchCharacterLevelUps, deleteCharacterData } = require("./db/database");

const pool = new Pool(dbParams);
pool.connect();
const db = { getUserById, addCharacter, patchCharacterLevelUps, deleteCharacterData };

app.use(morgan("dev"));

app.use(express.urlencoded({ extended: true }));

app.use(express.static("public"));

const usersRoutes = require("./routes/users");
const dataRoutes = require("./routes/data");

app.use("/api/users", usersRoutes(db));
app.use("/api/data", dataRoutes(db));

app.get("/", (req, res) => {
  res.send("Home Page");
});

app.listen(PORT, () => {
  console.log(`Eternal Return server listening on port ${PORT}`);
});
