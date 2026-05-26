const { verifyToken } = require("../services/auth");
const User = require("../models/user");
function checkAuth(){
    return async (req,res,next) => {
        const providedToken = req.cookies?.uid;
        if(!providedToken){
            return next();
        }
            try{
                const decoded = verifyToken(providedToken);
                const user = await User.findById(decoded._id);
                req.user = user;
            }catch(err){}
            return next();
    }
}

module.exports = {
    checkAuth
}