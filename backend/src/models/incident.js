const mongoose = require('mongoose');
const uuid = require('uuid');

const incidentSchema = new mongoose.Schema({
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

module.exports = mongoose.model('Incident', incidentSchema);