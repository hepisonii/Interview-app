const jwt = require("jsonwebtoken");
const SECRET = process.env.SECRET_KEY;

function setToken(user){
    return jwt.sign({
        _id: user._id,
        fullname: user.fullname,
        username: user.username,
        role: user.role,
        qualifications: user.qualifications,
        age: user.age,
        profileImageURL: user.profileImageURL
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