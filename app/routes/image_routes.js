const express = require('express')
const passport = require('passport')
const WishList = require('../models/wishListModel')
require("dotenv").config()
const cloudinary = require('cloudinary').v2
//const upload = require('../../utils/multer')
console.log(cloudinary.config().cloud_name)
const customErrors = require('../../lib/custom_errors')
const handle404 = customErrors.handle404
const requireOwnership = customErrors.requireOwnership
const removeBlanks = require('../../lib/remove_blank_fields')
const requireToken = passport.authenticate('bearer', { session: false })
const router = express.Router()

// ////////////////////////////
// Create
// Post an image of the recipient
///////////////////////////////
router.post('/image/:wishListId', removeBlanks, (req, res, next) => {
	try {
		const fileStr = req.body.image

		//console.log('this is the file\n', fileStr) 
		const wishListId = req.params.petId
		console.log('this is fileStr in imagePost', fileStr)

		// console.log('this is the uploaded info\n', uploadedResponse)
		// does the W below need to capitalized? It was in PetMatch "Pet.findByIdAndUpdate"
		WishList.findByIdAndUpdate(wishListId, { img: fileStr },
			function (err, doc) {
				if (err) {
					console.log(err)
				}
				else {
					console.log("Updated Wish List : ", doc);
				}
			})
		res.json({ msg: "success" })
	} catch (error) {
		console.log(error)
		res.status(500).json({ err: error })
	}
})

/////////////////////////////////////////
// Export Router
/////////////////////////////////////////
module.exports = router