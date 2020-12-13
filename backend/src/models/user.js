const mongoose = require('mongoose');
const uuid = require('uuid');

// dynamoose.aws.sdk.config.update({
//     "accessKeyId": "AKID",
//     "secretAccessKey": "SECRET",
//     "region": "us-east-1"
// });

// dynamoose.aws.ddb.local();

const userSchema = new mongoose.Schema({
    id: {
        type: String,
        hashKey: true,
        required: true,
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

module.exports = mongoose.model('User', userSchema);