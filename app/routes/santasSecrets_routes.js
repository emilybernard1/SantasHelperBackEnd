// basic subdoc routes

const express = require('express')
const passport = require('passport')

const WishList = require('../models/wishListModel')

const customErrors = require('../../lib/custom_errors')
const handle404 = customErrors.handle404
const requireOwnership = customErrors.requireOwnership
const removeBlanks = require('../../lib/remove_blank_fields')
const requireToken = passport.authenticate('bearer', { session: false })
const router = express.Router()


// only need Create, Update, and Delete

// ////////////////////////////////////////////
// POST -> only user can create a Santas Secrets list
///////////////////////////////////////////////
// POST /santasSecrets/<santasSecrets_id>
router.post('/santasSecrets/:wishListId/:santasSecretId', removeBlanks, (req, res, next) => {
    // get the santasSecret from req.body
    const santasSecrets = req.body.santasSecrets
    const wishListId = req.params.wishListId
    // find the wishList by it's ID
    WishList.findByIdAndUpdate(wishListId)
        .then(handle404)
        // add the santasSecret to the wishList
        .then(wishList => {
            // push the santasSecret into the wishList's santasSecret array and return the saved wishList
            wishList.santasSecrets.push(santasSecrets)
            return wishList.save()
        })
        .then(wishList => res.status(201).json({ wishList: wishList }))
        .catch(next)
    // pass to the next thing
})

// //////////////////////////////////////////
// UPDATE a single santasSecret
// //////////////////////////////////////////
// PATCH -> /santasSecrets/<wishList_id>//<santasSecret_id>
router.patch('/santasSecrets/:wishListId', requireToken, removeBlanks, (req, res, next) => {
    const { wishListId, santasSecretId } = req.params

    WishList.findById(wishListId)
        .then(handle404)
        .then(wishList => {
            const theSantasSecret = wishList.santasSecrets.id(santasSecretsId)
            requireOwnership(req, wishList)

            theSantasSecret.set(req.body.santasSecrets)
  
            return wishList.save()
        })
        .then(wishList => res.sendStatus(204))
        .catch(next)
})

// //////////////////////////////////////////
// DESTROY a santasSecret
// //////////////////////////////////////////
// DELETE -> /santasSecrets/<wishList_id>//<santasSecret_id>
router.delete('/santasSecrets/:wishListId/:santasSecretId', requireToken, (req, res, next) => {
    const { wishListId, santasSecretsId } = req.params

    WishList.findById(wishListId)
        .then(handle404)
        .then(wishList => {
            const theSantasSecret = wishList.santasSecrets.id(santasSecretsId)

            requireOwnership(req, wishList)

            theSantasSecret.remove()

            return wishList.save()
        })
        .then(wishList => res.sendStatus(204))
        .catch(next)
})

/////////////////////////////////////////
// Export Router
/////////////////////////////////////////
module.exports = router
