const mongoose = require('mongoose')
const santasSecretsSchema = require('./santasSecretsModel')

const wishListSchema = new mongoose.Schema(
	{
		name: {
			type: String,
			required: true,
		},
		item: {
			type: String,
			required: true,
		},
		img: {
			type: String,
			required: false,
		},
		isBought: {
			type: Boolean,
			required: false,
		},
		isWrapped: {
			type: Boolean,
			required: false,
		},
		type: {
			type: String,
			required: true,
		},
		santasSecrets: [santasSecretsSchema],
		owner: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'User',
			required: true,
		},
	},
	{
		timestamps: true,
		toObject: { virtuals: true },
		toJSON: { virtuals: true }
	}
)


module.exports = mongoose.model('WishList', wishListSchema)