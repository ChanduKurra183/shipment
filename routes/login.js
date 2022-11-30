const express = require('express')
const bycrypt = require('bcrypt')
const uuid = require('uuid')
const login = express.Router()

const User = require('../routes/schemas/user')
const { generateJWT, verifyJWT } = require('../utils/auth')
const validate = require('express-jsonschema').validate;
const ValidationSchemas = require("../validation/login");


login.get("/login", (req, res) => {

    if (req.session.isAuth) return res.send(true);
    else return res.send(false);

})

login.post("/login", validate({ body: ValidationSchemas.loginSchema }), async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(406).send({
            status: false,
            message: !email ? "Email is required." : "Password is required.",
        });
    }

    let user = await User.findOne({ email }, { _id: 0, __v: 0, cd: 0 }).lean();

    if (!user)
        return res
            .status(404)
            .send({ status: false, message: "User does'nt exists." });

    const isMatch = await bycrypt.compare(password, user.password);

    if (!isMatch)
        return res
            .status(406)
            .send({ status: false, message: "Username/Password not correct." });

    if (user.user_status == "In Active")
    return res
        .status(200)
        .send({ status: true, message: "you are de-registered, Please contact Admin to register" });

    req.session.isAuth = true;
    req.session.user_id = user.user_id;

    // remove password from user data
    delete user["password"];
    // get JWT token
    const { signedToken, exp } = generateJWT(user);
    // send token back in response
    user["token"] = signedToken;
    user["valid_upto"] = new Date(+(exp * 1000)).toLocaleString("en-GB", { timeZone: "IST" });

    res.send({
        status: true,
        data: user,
        message: "User fetched successfully",
    });
});


login.post("/logout", verifyJWT, (req, res) => {

    req.session.destroy((err) => {
        if (err) throw err;
        return res.send({ status: true, message: "logged out." })
    })

})

login.post("/register", validate({ body: ValidationSchemas.registerUserSchema }), async (req, res) => {

    const { email, name, password, address, district, state, country, company_name, gstin, role } = req.body;
    console.log("1");
    let user = await User.findOne({ email });

    if (user) return res.status(406).send({ status: false, message: "User already exists." });
    console.log("2");
    let role_id;

    if (role == "Customer") {
        console.log(" in cus");
        role_id = 2;
    }
    else {
        console.log("in dp");
        role_id = 3;
    }

    let hassedPassword = await bycrypt.hash(password, 12);
    console.log("3", role_id, role);
    try {
    user = new User({
        user_id: uuid.v4(),
        name,
        email,
        address,
        district,
        state,
        country,
        company_name,
        gstin,
        password: hassedPassword,
        role,
        role_id,
        user_status:"Active",
        // customer or delivery_partner
        cd: new Date()
    });
    console.log("4", user);
    await user.save();

    res.send({ status: true, message: "User Saved Successfully." })
} catch (error) {
    console.log(error);
    if(error.name = "MongoError") {
        res.status(400).send({ status: false, message: "Unable to register. Please try after sometime." });  
    }
    res.status(400).send({ status: false, message: "Creating user failed." });
}

})



module.exports = login

