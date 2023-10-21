const knex = require('knex');
const knexConfig = require('../knex');

const db = knex(knexConfig.development);
const databaseConfig = require('../../config/database.config')
const {tableName} = databaseConfig;

const getAllActions= async (pagination) => {
    const query = db(tableName.actions).where('delete', 0)
    const total = await query.clone().count('* as total');
    const actions = await query.clone()
        .select()
        .limit(pagination.pageSize)
        .offset((pagination.page - 1) * pagination.pageSize);

    const data = {
        total : total,
        actions
    }

    return data;
}

const getActionById = async (id) => {
    const query = db(tableName.actions).where('id', id).andWhere('delete', 0);
    const action = await query.clone().first();
    if(!action) {throw new Error(`không tồn tại dữ liệu có ID là ${id}`)}
    return action;
}

const updated = async (id, data) =>{
    const query = db(tableName.actions).where('id', id).andWhere('delete', 0);
    const checkExist = await query.clone().first();
    if(!checkExist) {throw new Error(`dữ liệu có Id là ${id} không tồn tại`)}

    if(data.name !== checkExist.name){
        const checkNameExist = await db(tableName.actions).where('name', data.name).andWhere('delete', 0).first();
        if(checkNameExist){throw new Error(`tên action: ${data.name} đã tồn tại`)}
    }

    await query.clone().update(data)
        .catch((error) => {
            throw new Error('update error: ' + error.sqlMessage)
        })

    return  {
        message : 'update dữ liệu thành công',
        error : false
    }
}

const created = async (data) => {
   const query = db(tableName.actions)
    const checkNameExist = await query.clone().where('name', data.name).first();
    if(checkNameExist){throw new Error(`tên action là ${data.name} đã tồn tại`)}

    await query.clone().insert(data).catch((error) => {throw new Error(error.sqlMessage)})

    return {
       error : false,
        message : 'Create dữ liệu thành công'
    }

}

const deleted = async (data,id) => {
    const query = db(tableName.actions).where('id', id).andWhere('delete', 0);
    const checkExist = await query.clone().first();
    if(!checkExist){throw new Error(`dữ liệu có ID là ${id} không tồn tại`)}
    await query.clone().update(data).catch((e) => {throw new Error(e)});
    return {error : false, message : 'delete dữ liệu thành công!'}
}


module.exports = {
    getAllActions, getActionById, updated, created, deleted
}