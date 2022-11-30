const jwt = require("jsonwebtoken");
const Config = require("../config");

function generateJWT(user) {
    const signedToken = jwt.sign(user, Config.JWT_SECRET, {
        expiresIn: 60 * 60*7,
    });
    // get the decoded payload and header
    let decoded = jwt.decode(signedToken, {complete: true});
    let exp = decoded.payload.exp;
    return {signedToken, exp};
}

function verifyJWT(req, res, next) {
    const isTokenPresent = req.headers.hasOwnProperty("authorization");
    
    if (isTokenPresent) {
        const token = req.headers["authorization"].split(" ")[1];
        const options = { ignoreExpiration: false };
        jwt.verify(token, Config.JWT_SECRET, options, (err, decode) => {
            // console.log("decode==>", decode);
            if (err)
                res.status(406).send({
                    status: false,
                    message: "JWT verification failed.",
                });
            else next();
        });
    } else {
        res.status(406).send({ status: false, message: "JWT token required." });
    }
}

module.exports = { generateJWT, verifyJWT };
