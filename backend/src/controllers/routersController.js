
const moment = require('moment');
const routerModel = require('../databases/models/routersModels');
const {router} = require("express/lib/application");

const getAllRouters = async (req, res) => {
    const {body, user} = req;
    const {pagination} = body;
    try {
      const routers = await routerModel.getAllRouters(pagination,user);
      res.json(routers);

    } catch (error) {
        console.error(error);
        res.json({error : true, message: error.message});
    }
}

const getRouterById = async (req, res) => {
    const {body, user} = req;
    const {id} = body;
    try {
        const router = await routerModel.getRouterById(id, user);
        res.json(router);
    } catch (error) {
        console.error(error);
        res.json({error : true, mesage: error.mesage});
    }
}

const updated = async (req, res) => {
    const {body, user} = req;
    const {id, name, link, parent, description, action_name} = body;
    const today = moment().format('YYYY-MM-DD HH:mm:ss');
    const data = {
        name : name.trim(),
        link : link.trim(),
        parent,
        description : description.trim(),
        updated_by : user.username,
        updated_at: today,
    }
    try {
        const router = await routerModel.updated(id,data, user, action_name);
        res.json(router);
    } catch (error) {
        console.error(error);
        res.status(404).json({
            error : true,
            massege : error.message
        });
    }
}

module.exports = {
    getAllRouters,
    getRouterById,
    updated
}