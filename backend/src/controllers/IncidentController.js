const crypto = require('crypto');

const Incident = require('../models/incident.js');
const { runImageFaceDetection } = require('../functions/faceDetection');


module.exports = {

    async index(req, res) {
        //const { page = 1 } = req.query;

        const count = await Incident.scan().count().exec();

        const incidents = await Incident.scan()
        .exec();

        res.header('X-Total-Count', count["count"]);

        return res.json(incidents);
    },


    async createIncident(req, res) {
        
        const {image} = req.body;

        const user_id = req.headers.authorization;
        // console.log(image)
        // load base64 encoded image
        if(image){
            const detectImage = runImageFaceDetection(image);

            // console.log(detectImage);

            if(detectImage){
                const id = crypto.randomBytes(8).toString('HEX');

                const incident = await Incident.create({ 
                    "image_id": id,
                    "user_id": user_id, 
                    "image": detectImage
                });
                //console.log(image_id)
                // return res.json(incident);
                return res.json({detected: true});
            }else{
                return res.json({detected: false});
            }

        }else{
            return res.status(400).json({error: 'Invalid Image'});
        }
        
        
    },

    async delete(req, res) {
        const { id } = req.params;
        const user_id = req.headers.authorization;

        const incident = await Incident.scan("image_id").eq(id).attributes(["user_id"]).exec();

        // console.log(incident[0]["user_id"]);

        if(incident[0]["user_id"] !== user_id) {
            return res.status(401).json({error: 'Operation not permited'});
        }

        try {
            await Incident.delete(id);
            console.log("Successfully deleted item");
        } catch (error) {
            console.error(error);
        }

        return res.status(204).send();
    }



};