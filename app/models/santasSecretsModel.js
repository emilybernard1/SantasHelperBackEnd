// import dependencies
const mongoose = require('mongoose')

const santasSecretsSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    secret: {
        type: String,
    },
    isBought: {
        type: Boolean,
        required: false,
    },
    isWrapped: {
        type: Boolean,
        required: false,
    },
}, {
    timestamps: true,
})

module.exports = santasSecretsSchema 