const actionsModels = require('../databases/models/actionsModels')
const moment = require('moment');



const getAllActions = async (req, res) => {
    const {pagination} = req.body;
    try {

        const actions = await actionsModels.getAllActions(pagination);

        res.json({
            error : false,
            data : actions,
            message : 'lấy tất cả dữ liệu user thành công',
        });
    } catch (error) {
      console.error('error:', error);
    }
}

const getActionById = async (req, res) => {
    const {id} = req.body;
    try {
        const action = await actionsModels.getActionById(id);
        res.json({
            error : false,
            data : action,
            message : 'lấy  dữ liệu theo ID thành công'
        });
    } catch (error) {
        console.error('error:', error.message);
        res.json({
            error : true,
            message : error.message
        });
    }
}

const updated = async (req, res) => {
    const {user, body} = req;
    const {
        id,
        name,
        icon,
        description,
    } = body;
    // const today = moment().format('yyyy-MM-dd HH:mm:ss');
    const today = moment().format('YYYY-MM-DD HH:mm:ss');
    const data = {
        name: name.trim(),
        icon: icon.trim(),
        description: description.trim(),
        updated_by: user.username,
        updated_at:today
    };
    try {
        const action = await actionsModels.updated(id,data);
        res.status(200).json(action);
    } catch (error) {
        console.error('Error:', error.message);
        res.status(404).json({ error: true, message: error.message });
    }
}

const created = async (req,res) => {
    const {body, user} = req
    const {name,icon,description} = body;
    const today = moment().format('YYYY-MM-DD HH:mm:ss');
    const data = {
        name : name.trim(),
        icon : icon.trim(),
        description : description.trim(),
        created_by : user.username,
        created_at : today,
        delete: 0
    }
    try {
        const action = await actionsModels.created(data);
        res.json(action);
    } catch (error) {
        console.error(error);
        res.status(404).json({
            error : true,
            message : error.message,
        });
    }
}

const deleted = async (req, res) => {
    const {body, user} = req;
    const {id} = body;
    const today = moment().format('YYYY-MM-DD HH:mm:ss')
    const data = {
        delete : 1,
        updated_at: today,
        updated_by: user.username,
    }
    try {
        const actiondel = await actionsModels.deleted(data,id)
        res.json(actiondel);
    } catch (error) {
        console.error(error);
        res.json({error: true, message: error.message});
    }
}

module.exports = {
    getAllActions,getActionById, updated, created, deleted
}