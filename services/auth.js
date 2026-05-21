const jwt = require("jsonwebtoken");
const SECRET = process.env.SECRET_KEY;

function setToken(user){
    return jwt.sign({
        _id: user._id,
        fullName: user.fullName,
        interviewRole: user.interviewRole,

    },SECRET);
}

function verifyToken(token){
    if(!token) return null;
    return jwt.verify(token,SECRET);
}

module.exports = {
    setToken,
    verifyToken
}