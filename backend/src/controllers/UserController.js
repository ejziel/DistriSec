const crypto = require('crypto');
// import ('../models/user');
const User = require('../models/user.js');

module.exports = {

    async index(req, res) {
        const users = await User.scan().exec();
        return res.json(users);
    },

    async createUser(req, res) {
        const {name, email} = req.body;

        const id = crypto.randomBytes(4).toString('HEX');
        console.log(id);

        const user = await User.create({
            "id": id, 
            "name": name, 
            "email": email
        }); 

        return res.json(user); 
    }

}