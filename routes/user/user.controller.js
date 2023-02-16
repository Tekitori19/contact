const asyncHandler = require("express-async-handler")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const User = require("../../models/users.Model")

// @desc register user
// @route POST /api/users/register
// @access public
const registerUser = asyncHandler(async (req, res) => {
    const { username, email, password } = req.body
    if (!username | !email | !password) {
        res.status(400)
        throw new Error('Pls sign infomation')
    }
    const userAvailable = await User.findOne({ email })
    if (userAvailable) {
        res.status(400)
        throw new Error('User already register')
    }
    //hash password
    const hashedPassword = await bcrypt.hash(password, 2)
    const user = await User.create({
        username,
        email,
        password: hashedPassword
    })
    if (user) {
        res.status(201).json({ _id: user.id, email: user.email })
    } else {
        res.status(400)
        throw new Error("User data is not valid")
    }
})

// @desc login user
// @route POST /api/users/login
// @access private
const loginUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body
    if (!email | !password) {
        res.status(400)
        throw new Error("Pls sign email and password")
    }
    const user = await User.findOne({ email })
    // compare password with hashed password
    if (user && (await bcrypt.compare(password, user.password))) {
        const accessToken = jwt.sign({
            user: {
                username: user.username,
                email: user.email,
                id: user.id
            }
        },
            process.env.ACCESS_TOKEN_SECRET,
            { expiresIn: "1m" }
        )
        res.json({ accessToken })
    } else {
        res.status(401)
        throw new Error("email or password are not valid")
    }
})

// @desc current user
// @route GET /api/users/current
// @access public
const currentUser = asyncHandler(async (req, res) => {
    res.json({ message: "current user" })
})

module.exports = {
    registerUser,
    loginUser,
    currentUser
}