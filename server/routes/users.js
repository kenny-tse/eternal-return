const express = require('express');
const router = express.Router();
const axios = require('axios');

module.exports = (db) => {

  router.get("/", (req, res) => {

    db.getUserById()
      .then((data) => {
        res.send(data);
      })
      .catch(e => {
        console.error(e);
        res.send(e);
      });
  });

  // search user by nickname
  // http://localhost:4000/api/users/bubblebear
  router.get("/:nickname", (req, res) => {

    let nickname = req.params.nickname;

    axios.get(`https://open-api.bser.io/v1/user/nickname?query=${nickname}`, {
      headers: {
        "x-api-key": process.env.API_KEY
      }
    }).then((response) => {
      res.send(response.data)
    }).catch((error) => {
      console.log(error)
    })
  });

  // search user games by player id
  // http://localhost:4000/api/users/games/1494
  router.get("/games/:id", (req, res) => {

    let id = req.params.id;

    axios.get(`https://open-api.bser.io/v1/user/games/${id}`, {
      headers: {
        "x-api-key": process.env.API_KEY
      }
    }).then((response) => {
      res.send(response.data)
    }).catch((error) => {
      console.log(error)
    })
  });

  // search player stats by season and id
  // http://localhost:4000/api/users/games/1494/season
  router.get("/games/:id/season", (req, res) => {

    let id = req.params.id;
    let seasonId = 5;

    axios.get(`https://open-api.bser.io/v1/user/stats/${id}/${seasonId}`, {
      headers: {
        "x-api-key": process.env.API_KEY
      }
    }).then((response) => {
      res.send(response.data)
    }).catch((error) => {
      console.log(error)
    })
  });

  // test db connection
  // http://localhost:4000/api/users/test
  router.get("/test", (req, res) => {

    db.getUserById()
      .then((result) => {
        res.send(result)
      }).catch((error) => {
        console.log(error)
      })
  });

  return router;
};
