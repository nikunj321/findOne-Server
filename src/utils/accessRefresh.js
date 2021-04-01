const { sign } = require('jsonwebtoken');

function issueAccessToken(payload) {
    return sign(payload, process.env.ACCESS_TOKEN_SECRET, {
        algorithm: "HS256",
        expiresIn: "15m"
    });
}

function issueRefreshToken(payload) {
    return sign(payload, process.env.REFRESH_TOKEN_SECRET, {
        algorithm: "HS256",
        expiresIn: "7d"
    });
}

module.exports = {
    issueAccessToken,
    issueRefreshToken
}