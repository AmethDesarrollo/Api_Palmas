const { verify } = require("jsonwebtoken");

module.exports = {
    checkToken: (req, res, next) => {
        let token = req.get("authorization");
        if(token){
            token = token.slice(7, token.length);
            verify(token, process.env.TOKEN, (err, decoded) => {
                if(err){
                    return res.status(401).json({
                        success: 200,
                        message: "Invalid token"
                    });
                }else{
                    req.decoded = decoded;
                    next();
                }
            });
        }else{
            return res.status(401).json({
                success: 401,
                message: "Access denied"
            });
        }
    }
};