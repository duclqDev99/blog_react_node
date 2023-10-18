const knex = require('knex');
const knexConfig = require('../knex');

const db = knex(knexConfig.development);

const tableNameUsers = 'users'

const getAllUsers = () => {
    return db(tableNameUsers).select('*')
}

module.exports = {
    getAllUsers,
};