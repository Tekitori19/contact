const express = require('express')
const router = express.Router()
const {
    getAllContact,
    get1Contact,
    createNewContact,
    updateContact,
    deleteContact
} = require("./contact.controller")

//get all contact +create new contact
router.route("/").get(getAllContact).post(createNewContact)

//get 1 contact with id + update contact and delete contact
router.route('/:id').get(get1Contact).put(updateContact).delete(deleteContact)

module.exports = router