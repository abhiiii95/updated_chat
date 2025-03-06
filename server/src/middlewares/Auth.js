const jwt = require("jsonwebtoken")

exports.Auth = async (req, res, next) => {
    try {

        const JWT_token = req.cookies.jwt
        console.log("JWT_token from cookies", JWT_token)

        const decode = jwt.verify(JWT_token, process.env.JWT_SECRET);

        req.user = decode
        next()

    } catch (error) {
        console.log("Error in Auth middleware", error)
        res.status(500).json({
            status: false,
            message: "Internal server error",
            error: error.message
        })

    }
}