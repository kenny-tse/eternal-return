const { Pool } = require('pg');

const pool = new Pool({
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME
});

const getUserById = function () {

  // Test connect to db by changing the sqlString and comment out place holder db return
  let userId = 3;

  const sqlString = `SELECT * FROM users WHERE id = $1`;
  return pool
    .query(sqlString, [userId])
    .then(res => {
      if (res.rows.length === 0) {
        return null;
      }
      return res.rows[0];
    })
    .catch(e => { console.error(e) });

  // PLACE HOLDER DB RETURN
  // return new Promise((res, rej) => {
  //   return res("I'm a user!");
  // })
}
exports.getUserById = getUserById;


const addCharacter = function (characterObj) {

  const sqlString = `INSERT INTO characters (code, name, maxHp, maxSp, strLearnStartSkill, initExtraPoint, maxExtraPoint, attackPower, defense, criticalStrikeChance, hpRegen, spRegen, attackSpeed, attackSpeedLimit, attackSpeedMin, moveSpeed, sightRange, radius, pathingRadius, uiHeight, resource ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18, $19, $20, $21 ) RETURNING *`;

  return pool
    .query(sqlString, [characterObj.code, characterObj.name, characterObj.maxHp, characterObj.maxSp, characterObj.strLearnStartSkill, characterObj.initExtraPoint, characterObj.maxExtraPoint, characterObj.attackPower, characterObj.defense, characterObj.criticalStrikeChance, characterObj.hpRegen, characterObj.spRegen, characterObj.attackSpeed, characterObj.attackSpeedLimit, characterObj.attackSpeedMin, characterObj.moveSpeed, characterObj.sightRange, characterObj.radius, characterObj.pathingRadius, characterObj.uiHeight, characterObj.resource])
    .then(res => {
      console.log(`Successfully added character ${characterObj.name}.`)
      return res.rows;
    })
    .catch(e => { console.error(e) });
}
exports.addCharacter = addCharacter;

const patchCharacterLevelUps = function (characterObj) {

  const sqlString = `UPDATE characters SET maxHpLevel = $1, maxSpLevel = $2, attackPowerLevel = $3, defenseLevel = $4, criticalChanceLevel = $5, hpRegenLevel = $6, spRegenLevel = $7, attackSpeedLevel = $8, moveSpeedLevel = $9 WHERE code = $10`;

  return pool
    .query(sqlString, [characterObj.maxHp, characterObj.maxSp, characterObj.attackPower, characterObj.defense, characterObj.criticalChance, characterObj.hpRegen, characterObj.spRegen, characterObj.attackSpeed, characterObj.moveSpeed, characterObj.code])
    .then(res => {
      console.log(`Successfully patched level up data for character ${characterObj.name}.`)
      return res.rows;
    })
    .catch(e => { console.error(e) });
}
exports.patchCharacterLevelUps = patchCharacterLevelUps;


const deleteCharacterData = function () {

  const sqlString = `TRUNCATE characters`;

  return pool
    .query(sqlString)
    .then(res => {
      console.log(`Removed character data to populate.`)
      return res.rows;
    })
    .catch(e => { console.error(e) });
}
exports.deleteCharacterData = deleteCharacterData;
