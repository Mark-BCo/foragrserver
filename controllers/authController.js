const bcrypt = require('bcrypt')
// Signature encryption to share security between the client side and server side
const jwt = require('jsonwebtoken')
const asyncHandler = require('express-async-handler')

// The User Model Schema
const User = {
    users: require('../models/user'),
    setUsers: function (data) {this.users = data}
}

// @desc LOGIN
// @route POST /auth
// @access PUBLIC
const login = asyncHandler(async (req, res) => {

    const { username, password } = req.body

    if (!username || !password) {
        return res.status(400).json({ message: 'These fields are required' })
    }

    const foundUser = await User.users.findOne({ username }).exec()

    if (!foundUser || !foundUser.active) {
        return res.status(401).json({ message: 'Unauthorised' })
    }

    const match = await bcrypt.compare(password, foundUser.password)

    if (!match) return res.status(401).json({ message: 'Unauthorised' })

    const accessToken = jwt.sign(
        {
            "UserInfo": {
                "username": foundUser.username,
                "roles": foundUser.roles
            }
        },
        process.env.ACCESS_TOKEN_SECRET,
        { expiresIn: '15m' }
    )

    const refreshToken = jwt.sign(
        { "username": foundUser.username },
        process.env.REFRESH_TOKEN_SECRET,
        { expiresIn: '7d' }
    )

    res.cookie('jwt', refreshToken, {
        httpOnly: true, //accessible only by web server 
        secure: true, //https
        sameSite: 'None', //cross-site cookie 
        maxAge: 7 * 24 * 60 * 60 * 1000 //cookie expiry: set to match rT
    })

    // send access token contatining username and roles
    res.json({ accessToken })
})

// @desc Refresh
// @route GET /auth/refresh
// @access Public - because access token has expired
const refresh = (req, res) => {

    const cookies = req.cookies

    if (!cookies?.jwt) return res.status(401).json({ message: 'Unauthorised' })

    const refreshToken = cookies.jwt

    jwt.verify(
        refreshToken,
        process.env.REFRESH_TOKEN_SECRET,
        asyncHandler(async (err, decoded) => {
            if (err) return res.status(403).json({ message: 'Forbidden' })

            const foundUser = await User.users.findOne({ username: decoded.username }).exec()

            if (!foundUser) return res.status(401).json({ message: 'Unauthorized' })

            const accessToken = jwt.sign(
                {
                    "UserInfo": {
                        "username": foundUser.username,
                        "roles": foundUser.roles
                    }
                },
                process.env.ACCESS_TOKEN_SECRET,
                { expiresIn: '15m' }
            )

            res.json({ accessToken })
        })
    )
}

// @desc Logout
// @route POST /auth/logout
// @access Public - clear the cookie if it exists at logout
const logout = (req, res) => {

    const cookies = req.cookies

    if (!cookies?.jwt) return res.sendStatus(204) //No content

    // console.log(cookies) - TEST ONLY

    res.clearCookie('jwt', { httpOnly: true, sameSite: 'None', secure: true })

    res.json({ message: 'Cookie cleared' })

}

module.exports = {
    login,
    refresh,
    logout
}