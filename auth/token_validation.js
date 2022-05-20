const { verify } = require("jsonwebtoken");
module.exports = {
    checkToken: (req, res, next) => {
        let token = req.get("authorization");
        if (token) {
            token = token.slice(7, token.length);

            try {
                verify(token, process.env.TOKEN, (err, decoded) => {
                    req.decoded = decoded;
                    next();
                });
            } catch {
                return res.status(401).json({ "error": true, "message": 'Unauthorized access.' });
            }

        } else {
            return res.status(403).send({
                "error": true,
                "message": 'No token provided.'
            });
        }
    },
};