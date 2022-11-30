const ObjectId = require('mongodb').ObjectId;
const { query } = require('express');
const express = require('express')
const uuid = require('uuid')

const delivery = express.Router();
const User = require('../routes/schemas/user')
const Shipment = require('../routes/schemas/shipment')
const validate = require('express-jsonschema').validate;
const ValidationSchemas = require("../validation/login");

delivery.get("/get_delivery_partners", async (req, res) => {

    // console.log(req.params);

    let d_partners = await User.find({role_id: "3", user_status:"Active" },{__v:0})

    res.send({"Delivery Partners": d_partners})
})

delivery.patch("/update_shipment", validate({body:ValidationSchemas.updateShipment}),async (req, res) => {

    const { status, shipment_id  } = req.body;

    if (!shipment_id) {
        return res.status(406).send({
            status: false,
            message: "shipment Id is required / It cannot be empty.",
        });
    }

    let updateObj = {};

    if(status) updateObj.status = status;
    try {
        let response = await Shipment.findByIdAndUpdate(shipment_id, updateObj, {new: true});
        res.send({status: true, data: response, message: 'Successfully updated.'})
    } catch (error) {
        console.log(error);
        res.send({status: false, message: "Unable to update."})  
    }

})


module.exports = delivery;