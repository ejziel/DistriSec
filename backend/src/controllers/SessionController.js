// const connection = require('../database/connection');
const User = require('../models/user.js');

module.exports = {
    async create(req, res) {
        const { id } = req.body;
        
        const user = await User.find({"id": id},"name").exec();
        

        if(user.length == 0) {
            return res.status(400).json({error: 'No User exist'});
        }

        return res.json(user);
    }
};