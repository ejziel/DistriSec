
const Incident = require('../models/incident.js');

module.exports = {
     async index(req, res) {

        const user_id = req.headers.authorization;
        
        const incidents = await Incident.scan("user_id").eq(user_id).exec();
      //   console.log(incidents);
        return res.json(incidents);
        
     }
 }