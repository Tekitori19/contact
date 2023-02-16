const mongoose = require("mongoose")
const userSchema = mongoose.Schema({
    username: {
        type: String,
        required: [true, "Pls sign user name"]
    },
    email: {
        type: String,
        required: [true, "Pls add email"],
        unique: [true, "Email address already taken"]
    },
    password: {
        type: String,
        required: [true, "Pls add a password"]
    }
}, {
    timestamps: true,
})

module.exports = mongoose.model("User", userSchema)