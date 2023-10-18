const knex = require('knex');
const knexConfig = require('../knex');
const db = knex(knexConfig.development);
const databaseConfig = require('../../config/database.config')


const tableName = databaseConfig.tableName;
const getUserByEmail = (email) => {
    return db(tableName.users).where('email', email).first();
}

const getPermission = async (id) => {
    const res = await db(tableName.users)
        .where('users.id', id)
        .join(tableName.groups, 'users.id_group', 'groups.id')
        .join(tableName.groupRouterAction, 'groups.id', 'group_route_action.id_group')
        .join(tableName.routerAction, 'group_route_action.id_route_action', 'route_action.id')
        .join(tableName.routers, 'route_action.id_route', 'routes.id')
        .join(tableName.actions, 'route_action.id_action', 'actions.id')
        // .select('routes.name as routerName', db.raw('GROUP_CONCAT(actions.name) as actionName'))
        .select('routes.name as routerName', db.raw('JSON_ARRAYAGG(actions.name) as actionName'))
        .groupBy('routes.name');
    console.log('res',res)
    return res;
}

module.exports = {
    getUserByEmail,
    getPermission
}