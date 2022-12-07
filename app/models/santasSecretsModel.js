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
        required: false, // consider assigning a default of false and requiring it 
    },
    isWrapped: {
        type: Boolean,
        required: false, // consider assigning a default of false and requiring it 
    },
}, {
    timestamps: true,
})

module.exports = santasSecretsSchema 