const route = require("express").Router()
const validateToken = require("../../middleware/validateTokenHandler")
const {
    registerUser,
    loginUser,
    currentUser
} = require("./user.controller")
route.post("/register", registerUser)

route.post("/login", loginUser)

route.get("/current", validateToken, currentUser)

module.exports = route