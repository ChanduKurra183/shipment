const express = require('express')
const uuid = require('uuid')

const admin = express.Router();
const User = require('../routes/schemas/user')
const Shipment = require('../routes/schemas/shipment')
const validate = require('express-jsonschema').validate;
const ValidationSchemas = require("../validation/login");


admin.get("/get", async (req, res) => {

  if (req.session.user_id == "570f217a-0067-4fda-8231-f2886964c19d") {

    let Users = await User.find({}, { __v: 0 })

    res.send({ "users": Users })
  }
})

admin.patch("/update_role_status", validate({ body: ValidationSchemas.updateStatus }), async (req, res) => {

  const { user_status, user_id } = req.body;
  if (req.session.user_id == "570f217a-0067-4fda-8231-f2886964c19d") {
    if (!user_id) {
      return res.status(406).send({
        status: false,
        message: "user Id is required / It cannot be empty.",
      });
    }

    let updateObj = {
      "$set":{
        "user_status":user_status
      }
    };

    if (user_status) updateObj.status = user_status;
    try {
      let response = await User.findOneAndUpdate(user_id, updateObj, { new: true });
      res.send({ status: true, data: response, message: 'Successfully updated.' })
    } catch (error) {
      console.log(error);
      res.send({ status: false, message: "Unable to update." })
    }
  }

})


module.exports = admin