const asyncHandler = require("express-async-handler");
const bcrypt = require("bcrypt");
const User = require("../models/userModel");
const jwt = require("jsonwebtoken");
const userRegister = asyncHandler(async (req, res) => {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
        res.status(400);
        throw new Error("All fields are required");
    }

    const userAvailable = await User.findOne({ email });
    if (userAvailable) {
        res.status(400);
        throw new Error("User already registered");
    }
    const hashPassWord = await bcrypt.hash(password, 10);
    const user = await User.create({
        name,
        email,
        password: hashPassWord
    });
    if (user) {
        res.status(200).json({
            id: user.id,
            email: user.email
        })
    } else {
        res.status(400);
        throw new Error("user data not valid");
    }
});

const userLogin = asyncHandler(async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        res.status(400);
        throw new Error("Email or password is required");
    }
    const user = await User.findOne({ email });
    if (user && bcrypt.compare(password, user.password)) {
        const accessToken = jwt.sign({
            user: {
                username: user.name,
                email: user.email,
                id: user.id
            }
        }, process.env.JWTSECRETKEY,
            { expiresIn: "15m" }
        );
        res.status(200).json({ accessToken });
    } else {
        res.status(401);
        throw new Error("email or password is invalid");
    }
})


const userInfo = asyncHandler(async (req, res) => {
    res.json(req.user)
})

module.exports = {
    userRegister,
    userLogin,
    userInfo
}