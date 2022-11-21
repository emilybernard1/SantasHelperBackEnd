// import dependencies
const mongoose = require('mongoose')

const santasSecretsSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    gift: {
        type: String,
    },
    isBought: {
        type: Boolean,
        required: false,
    },
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    }

}, {
    timestamps: true,
})

module.exports = santasSecretsSchema 