const asyncHandler = require("express-async-handler");
const Contact = require("../models/contactModel");
const createContact = asyncHandler(async (req, res) => {
    const { name, ph_number } = req.body;
    if (!name || !ph_number) {
        res.status(400);
        throw new Error("Not valid");
    }
    const contact = await Contact.create({
        name,
        ph_number,
        user_id: req.user.id
    });
    res.status(200).json({ contact })
})

const getAllContact = asyncHandler(async (req, res) => {
    const contact = await Contact.find({ user_id: req.user.id });
    res.status(200).json({ contact });
});

const getContact = asyncHandler(async (req, res) => {
    const contact = await Contact.findById({ user_id: req.user.id });
    if (!contact) {
        res.status(404);
        throw new Error("Contact Not Found");
    }
    res.status(200).json(contact);
});

const updateContact = asyncHandler(async (req, res) => {
    const contact = await Contact.findById(req.params.id);
    if (!contact) {
        res.status(404);
        throw new Error("Contact Not Found");
    }

    if (contact.user_id.toString() !== req.user.id) {
        res.status(401);
        throw new Error("User doen't have permission to update the other user contact details");
    }
    const updateContact = await Contact.findByIdAndUpdate(
        req.params.id,
        req.body,
        {
            new: true,
            runValidators: true
        }
    )
    res.status(200).json(updateContact);
});

const deleteContact = asyncHandler(async (req, res) => {
    const contact = await Contact.findById(req.params.id);
    if (!contact) {
        res.status(404);
        throw new Error("Contact Not Found");
    }

    if (contact.user_id.toString() !== req.user.id) {
        res.status(401);
        throw new Error("User doen't have permission to delete the other user contact details");
    }

    const deleteContact = await Contact.findByIdAndDelete(
        req.params.id
    );
    res.status(200).json(deleteContact);
});

module.exports = {
    createContact,
    getAllContact,
    getContact,
    updateContact,
    deleteContact
}