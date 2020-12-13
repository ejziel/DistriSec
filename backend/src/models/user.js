const dynamoose = require('dynamoose');
const uuid = require('uuid');

dynamoose.aws.sdk.config.update({
    "accessKeyId": "AKID",
    "secretAccessKey": "SECRET",
    "region": "us-east-1"
});

dynamoose.aws.ddb.local();

const userSchema = new dynamoose.Schema({
    id: {
        type: String,
        hashKey: true,
        default: uuid.v1(),
    },

    name: {
        type: String,
    },

    email:{
        type: String,
        required: true,
    }
    },

    {
    timestamps: true,
    }
);

module.exports = dynamoose.model('User', userSchema);