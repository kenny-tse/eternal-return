const express = require('express');
const router = express.Router();
const axios = require('axios');

module.exports = (db) => {

  // http://localhost:4000/api/data/lookup/:hash
  router.get("/lookup/:metaDataType", (req, res) => {

    axios.get(`https://open-api.bser.io/v1/data/${req.params.metaDataType}`, {
      headers: {
        "x-api-key": process.env.API_KEY
      }
    }).then((response) => {
      res.send(response.data)
    }).catch((error) => {
      console.log(error)
    })
  });

  // looks up character data and populates db
  // http://localhost:4000/api/data/Character
  router.get("/Character", (req, res) => {


    db.deleteCharacterData().then(() => {

      return axios.get(`https://open-api.bser.io/v1/data/Character`, {
        headers: {
          "x-api-key": process.env.API_KEY
        }
      })

    }).then((response) => {

      let promises = [];
      for (const characterObj of response.data.data) {
        promises.push(db.addCharacter(characterObj));
      }
      return Promise.all(promises);
    }).then(() => {

      console.log("---Successfully added initial character data---");
      return axios.get(`https://open-api.bser.io/v1/data/CharacterLevelUpStat`, {
        headers: {
          "x-api-key": process.env.API_KEY
        }
      })

    }).then((response) => {

      let promises = [];
      for (const characterObj of response.data.data) {
        promises.push(db.patchCharacterLevelUps(characterObj));
      }
      return Promise.all(promises);

    }).then((result) => {

      console.log("---Successfully patched character level up data---");
      res.send("---Successfully added character and their level up data---");

    })
      .catch((error) => {
        console.log(error)
      })
  });

  // get language data, this is where skill descriptions are
  // http://localhost:4000/api/data/language/:lang
  router.get("/language/:lang", (req, res) => {

    axios.get(`https://open-api.bser.io/v1/l10n/${req.params.lang}`, {
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
