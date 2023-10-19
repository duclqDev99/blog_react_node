
const usersModels = require('../databases/models/usersModels')
const bcrypt = require("bcrypt");

const getUsers = async (req, res) => {
    const {pagination}= req.body;
    try {
        const data = await usersModels.getAllUsers(pagination);
        res.json({
            user: data.data,
            total: data.total[0].total
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Lỗi khi lấy danh sách người dùng' });
    }
}

const getUserById = async (req, res) => {
    const {id}= req.body;
    try {
        const data = await usersModels.getUserById(id);
        res.json({data : data})
    } catch (error) {
      console.error('error:', error);
    }
}

const update = async (req, res) => {
    const {
        id,
        name,
        phone_number,
        id_group,
        address,
        email
    } = req.body;
    const data = {
        name : name.trim(),
        phone_number : phone_number.trim(),
        id_group,
        address : address.trim(),
        email : email.trim(),
    }
   try {
       const user = await usersModels.update(id, data);
       res.status(200).json(user);
   } catch (error) {
        console.error(error);
       res.status(404).json({ message: `update error : ${error.message} !` });
   }
}

const created = async (req, res) => {
    const {
        name,
        phone_number,
        id_group,
        address,
        email,
        password
    } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const data = {
        name : name.trim(),
        phone_number : phone_number.trim(),
        id_group,
        address : address.trim(),
        email : email.trim(),
        password : hashedPassword,
        delete : 0
    }
    try {
        const user = await usersModels.created(data);
        res.json(user);
    } catch (error) {
        console.error('error:', error);
        console.log(error)
        res.status(404).json({ message: error.message});
    }
}

const deleted = async (req, res) => {
    const {id} = req.body;
    try {
        const user = await usersModels.deleted(id);
        res.json(user);
    } catch (error) {
      console.error('error:', error);
      res.json({
          error : true,
          message: error.message,
      });
    }
    res.json();
}

module.exports = {
    getUsers,
    getUserById,
    update,
    created,
    deleted
}