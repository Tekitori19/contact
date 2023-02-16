const asyncHandler = require("express-async-handler")
const Contact = require('../../models/contacts.Model')

// @desc get all user
// @route GET /api/contacts/
// @access public
const getAllContact = asyncHandler(async (req, res) => {
    const contacts = await Contact.find()
    res.status(200).json(contacts)
})
// @desc get 1 user
// @route GET /api/contacts/:id
// @access public
const get1Contact = asyncHandler(async (req, res) => {
    const contact = await Contact.findById(req.params.id)
    if (!contact) {
        res.status(404)
        throw new Error('Contact not found')
    }
    res.status(200).json(contact)
})

// @desc create new user
// @route POST /api/contacts
// @access public
const createNewContact = asyncHandler(async (req, res) => {
    // console.log(req.body)
    const { name, email, phone } = req.body
    if (!name | !email | !phone) {
        res.status(400)
        throw new Error("Nhap thong tin di dumamay")
    }
    const contact = await Contact.create({
        name,
        email,
        phone,
    })
    res.status(201).json(contact)
})

// @desc update  user
// @route PUT /api/contacts/:id
// @access public
const updateContact = asyncHandler(async (req, res) => {
    const contact = await Contact.findById(req.params.id)
    if (!contact) {
        res.status(404)
        throw new Error('Contact not found')
    }
    const update_Contact = await Contact.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true }
    )
    res.status(200).json(update_Contact)
})

// @desc delete a user
// @route DELETE /api/contacts/:id
// @access public
const deleteContact = asyncHandler(async (req, res) => {
    const contact = await Contact.findById(req.params.id)
    if (!contact) {
        res.status(404)
        throw new Error('Contact not found')
    }
    await Contact.findByIdAndDelete(
        req.params.id
    )
    res.status(200).json(contact)
})

module.exports = {
    getAllContact,
    get1Contact,
    createNewContact,
    updateContact,
    deleteContact
}