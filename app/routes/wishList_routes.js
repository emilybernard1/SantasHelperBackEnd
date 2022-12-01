// Express docs: http://expressjs.com/en/api.html
const express = require('express')
// Passport docs: http://www.passportjs.org/docs/
const passport = require('passport')

// pull in Mongoose model for examples
const WishList = require('../models/wishListModel')

// this is a collection of methods that help us detect situations when we need
// to throw a custom error
const customErrors = require('../../lib/custom_errors')

// we'll use this function to send 404 when non-existant document is requested
const handle404 = customErrors.handle404
// we'll use this function to send 401 when a user tries to modify a resource
// that's owned by someone else
const requireOwnership = customErrors.requireOwnership

// this is middleware that will remove blank fields from `req.body`, e.g.
// { example: { title: '', text: 'foo' } } -> { example: { text: 'foo' } }
const removeBlanks = require('../../lib/remove_blank_fields')
// passing this as a second argument to `router.<verb>` will make it
// so that a token MUST be passed for that route to be available
// it will also set `req.user`
const requireToken = passport.authenticate('bearer', { session: false })

// instantiate a router (mini app that only handles routes)
const router = express.Router()


// ////////////////////////////
// Index
///////////////////////////////
//GET /santasHelper
// index for all wish lists
router.get('/santasHelper', (req, res, next) => {
    WishList.find()
        .populate('owner')
        .then(wishLists => {
            return wishLists.map(wishList => wishList)
        })
        .then(wishLists => {
            res.status(200).json({ wishLists: wishLists })
        })
        .catch(next)
})

// ////////////////////////////
// Show
///////////////////////////////
//GET /santasHelper/:id
router.get('/santasHelper/:id', (req, res, next) => {
    WishList.findById(req.params.id)
        .populate('owner')
        .then(handle404)
        .then(wishList => {
            res.status(200).json({ wishList: wishList })
        })
        .catch(next)

})

// ////////////////////////////
// Create
///////////////////////////////
//POST /wishLists
router.post('/santasHelper', requireToken, (req, res, next) => {
    req.body.wishList.owner = req.user.id

    // on the front end I HAVE TO SEND a wishList as the top level key
    // wishList: {name: '', type: ''}
    WishList.create(req.body.wishList)
        .then(wishList => {
            res.status(201).json({ wishList: wishList })
        })
        .catch(next)
    // .catch(error => next(error))

})

// ////////////////////////////
// Update
///////////////////////////////
// PATCH /wishLists/:id
router.patch('/santasHelper/:id', requireToken, removeBlanks, (req, res, next) => {
    delete req.body.wishList.owner

    WishList.findById(req.params.id)
        .then(handle404)
        .then(wishList => {
            requireOwnership(req, wishList)
            return wishList.updateOne(req.body.wishList)
        })
        .then(() => res.sendStatus(204))
        .catch(next)
})

// ////////////////////////////
// Destroy
///////////////////////////////
// DELETE /wishLists/:id
router.delete('/santasHelper/:id', requireToken, (req, res, next) => {
    WishList.findById(req.params.id)
        .then(handle404)
        .then((wishList) => {
            requireOwnership(req, wishList)
            wishList.deleteOne()
        })
        .then(() => res.sendStatus(204))
        .catch(next)
})

/////////////////////////////////////////
// Export Router
/////////////////////////////////////////
module.exports = router