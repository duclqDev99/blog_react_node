const knex = require('knex');
const knexConfig = require('../knex');

const db = knex(knexConfig.development);
const databaseConfig = require('../../config/database.config')
const {ER_CANT_LOCK_LOG_TABLE} = require("mysql/lib/protocol/constants/errors");
const {tableName} = databaseConfig;

const getAllRouters = async (pagination, user) => {
    const query = db(tableName.routerAction)
        .where('routes.delete', 0)
        .join(tableName.routers,'route_action.id_route', 'routes.id')
        .join(tableName.actions, 'route_action.id_action', 'actions.id')
        .select('routes.*', db.raw('JSON_OBJECTAGG(actions.id,actions.name) as action_name'))
        .groupBy('routes.id')

    const total = await db(tableName.routers).where('delete', 0).count('* as total');
    const routers = await query.clone()
        .limit(pagination.pageSize)
        .offset((pagination.page -1) * pagination.pageSize);
    return {
        error : false,
        message : `get dữ liệu thành công`,
        data : routers,
        total : total,
    }
}

const getRouterById = async (id, user) => {
    const query = db(tableName.routerAction)
        .where('routes.delete', 0)
        .where('routes.id', id)
        .join(tableName.routers,'route_action.id_route', 'routes.id')
        .join(tableName.actions, 'route_action.id_action', 'actions.id')
        .select('routes.*', db.raw('JSON_OBJECTAGG(actions.id,actions.name) as action_name'))
        .groupBy('routes.id')
    const router = await query.clone()
    return {
        error : false,
        message : ' get dữ liệu by id thành công',
        data : router,
    }
}

const updated = async (id,data, user, action_name) => {
    const knex = await db.transaction();
    const query = knex(tableName.routers).where('id',id)
    const queryActionRoute = knex(tableName.routerAction)
    const checkExist = await db(tableName.routers).where('id',id).clone().first();
    if(!checkExist) {throw new Error(`router có ID là ${id} không tồn tại!`)}

    const actionNotExist = await queryActionRoute.clone()
        .andWhere('id_route', id)
        .select()

    const routeActionDel = actionNotExist.filter((row) => !action_name.includes(row.id_action)).map((row) => row.id);

    const actionAdd = action_name.filter((id_action) => !actionNotExist.some((action) => action.id_action === id_action));

    let actions = actionAdd.map((value) => {
        return {id_route: id, id_action : value}
    })

    await query.clone().update(data);

    await knex(tableName.groupRouterAction)
        .whereIn('id_route_action', routeActionDel)
        .delete()
        .catch((e)=>
        {
            knex.rollback();
            throw new Error(e.sqlMessage)
        });
    await queryActionRoute
        .whereIn('id', routeActionDel)
        .delete()
        .catch((e)=>
            {
                knex.rollback();
                throw new Error(e.sqlMessage)
            });
    await knex(tableName.routerAction).insert(actions).catch((e) =>
    {
        knex.rollback();
        throw new Error(e.sqlMessage)
    });

    knex.commit()
    return {
        error: false,
        message : `update success!`
    }
}

module.exports = {
    getAllRouters,
    getRouterById,
    updated
}