// where you integrate db

const knex = require('knex');
const knexConfig =  require('../knexfile.js');
const dataBase = knex(knexConfig.development);

module.exports = {
    // names of database functions
}