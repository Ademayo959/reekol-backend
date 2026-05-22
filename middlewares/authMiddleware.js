const jwt = require('jsonwebtoken')

async function protect(req, res, next) {
    try {
        const header = req.headers.authorization
        if (!header) {
            res.status(401).json({ "message": "Error: No token found" })
            return;
        }
        if (!header.startsWith("Bearer ")) {
            res.status(401).json({ "message": "Error: Invalid token format" })
            return;
        }
        const token = header.split(" ")[1]
        if (!token) {
            res.status(401).json({ "message": "Error: No token found" });
            return;
        }
        const decodedPayload = jwt.verify(token, process.env.JWT_SECRET)
        req.user = decodedPayload
        next()
    } catch (err) {
        console.log(err)
        res.status(401).json({ message: "Not Authorized: no token found" })
    }
}

module.exports = { protect }