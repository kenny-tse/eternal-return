const express = require('express');
const router = express.Router();
const axios = require('axios');

module.exports = (db) => {

  // http://localhost:4000/api/data
  router.get("/", (req, res) => {

    axios.get(`https://open-api.bser.io/v1/data/hash`, {
      headers: {
        "x-api-key": process.env.API_KEY
      }
    }).then((response) => {
      res.send(response.data)
    }).catch((error) => {
      console.log(error)
    })
  });


  return router;
};