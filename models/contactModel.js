const mongoose = require("mongoose");

const contactSchema = mongoose.Schema({
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "User"
    },
    name: {
        type: String,
        required: [true, "please add the contact phone number"]
    },
    ph_number: {
        type: String,
        required: [true, "Please add your phone number"],
    }
})

module.exports = mongoose.model("Contact", contactSchema);