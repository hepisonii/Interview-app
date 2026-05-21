const { verifyToken } = require("../services/auth");

function checkAuth(){
    return (req,res,next) => {
        const providedToken = req.cookies?.uid;
        if(!providedToken){
            return next();
        }
            try{
                const providedPayload = verifyToken(providedToken);
                req.user = providedPayload;
            }catch(err){}
            return next();
    }
}

module.exports = {
    checkAuth
}