const dynamoose = require('dynamoose');
const uuid = require('uuid');

dynamoose.aws.sdk.config.update({
    "accessKeyId": "AKID",
    "secretAccessKey": "SECRET",
    "region": "us-east-1"
});

dynamoose.aws.ddb.local();

const incidentSchema = new dynamoose.Schema({
    image_id: {
        type: String,
        hashKey: true,
        default: uuid.v1(),
    },

    user_id: {
        type: String,
        required: true,
    },

    image:{
        type: String,
        required: true,
    }
    },

    {
    timestamps: true,
    }
);

module.exports = dynamoose.model('Incident', incidentSchema);