const knex = require('knex');
const knexConfig = require('../knex');

const db = knex(knexConfig.development);

const tableNameUsers = 'users'

const getAllUsers = async (pagination) => {
    const query = db(tableNameUsers).where('delete', 0);
    const total = await query.clone().count('* as total');
    const data = await query.clone().select('*')
        .limit(pagination.pageSize)
        .offset((pagination.page - 1) * pagination.pageSize);
    return {
        data,
        total
    }
}

const getUserById = (id) => {
    return(db(tableNameUsers)
        .where('id',id)
        .andWhere('delete', 0)
        .select('*')
    )
}

const update = async (id, data) => {
    const query = db(tableNameUsers).where('id',id).andWhere('delete', 0)

    const checkIsNull = await query.clone().first();
    if(!checkIsNull) {throw new Error(`update error: không tồn tại dữ liệu!`)}

    await query.clone().update(data)
        .catch((error) => {
            console.log('error,',error)
            throw new Error('update error: ' + error);
        })

    return {messenge: 'update success!',id,error : true};
}

const created = async (data) => {
    const query = db(tableNameUsers);
    const checkEmailExist = await query.clone().where("email", data.email).first();
    if(checkEmailExist) {throw new Error(`Create error: Email - ${data.email} - đã tồn tại!`)}

    await query.clone().insert(data).catch((e) => {throw new Error(`create error!: ${e}`)});
    return {error: false, messenge : "create success!"};
}

const deleted = async (id) => {
    const query = db(tableNameUsers).where('id',id);

    const checkIsNull = await query.clone().where('id',id).first();

    if(!checkIsNull) {throw new Error(`delete error: không tồn tại dữ liệu!`)}
    await query.update('delete', 1).catch((e) => {throw new Error(`delete error!: ${e}`)});
    return {error: false, messenge : "delete success!"};
}

module.exports = {
    getAllUsers,
    getUserById,
    update,
    created,
    deleted
};