const jwt = require('jsonwebtoken');
const config = require('config');

module.exports = function(req, res, next) {
    // get token from header
    const token = req.header('x-auth-token');

    // Check if token doesn't exist
    if(!token) {
        return res.status(401).json({ msg: "No token, Authorization denied!" })
    }

    // If a token exists, do the following
    try {
        const decoded = jwt.verify(token, config.get('jwtSecret'));

        req.user = decoded.user;
        // console.log(req.user);
        next();
    } catch (err) {
        res.status(401).json({ msg: "token is not valid" })
    }
}