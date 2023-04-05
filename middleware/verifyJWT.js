const jwt = require('jsonwebtoken')

const verifyJWT = (req, res, next) => {

    // Look at the authorisation header for lower and uppercase
    const authHeader = req.headers.authorization || req.headers.Authorization

    // console.log(req)

    // The word bearer is required and verify the token starts with
    if (!authHeader?.startsWith('Bearer ')) {
        return res.status(401).json({ message: 'Unauthorized' })
    }

    // Define the access token and split
    const token = authHeader.split(' ')[1]

    // Pass the token into this method, verify with access token secret
    jwt.verify(
        token,
        process.env.ACCESS_TOKEN_SECRET,
        (err, decoded) => {
            if (err) return res.status(403).json({ message: 'Forbidden' })
            // console.log(res)
            // console.log(err)
            // console.log(decoded)

            // Decoded values and set the request
            req.user = decoded.UserInfo.username
            req.roles = decoded.UserInfo.roles
            
            // Part of the midleware and moves onto the controller
            next()
        }
    )
}

module.exports = verifyJWT 