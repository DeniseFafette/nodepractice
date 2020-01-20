// where you integrate db

const knex = require('knex');
const knexConfig =  require('../knexfile.js');
const dataBase = knex(knexConfig.development);

module.exports = {
    // names of database functions
    find,
    insert,
    update,
    remove,
    findByUserName,
    findById
}

// finds all users
function find() {
    return dataBase('users')
}

// inserts a new user
function insert(user) {
    return dataBase('users').insert(user)
}

// update a user
function update(id, changes) {
    return dataBase('users')
    .where({id : id})
    .update(changes)
}

// delete a user
function remove(id) {
    return dataBase('users')
    .where({id : id})
    .del()
}

// find user by user name
// match the username in the table - plan ahead to match parameter name and table name
function findByUserName(username) {
    return dataBase('users').where({username}).first()
}

function findById(id) {
    return dataBase('users')
        .where({ id })
        .first()
}