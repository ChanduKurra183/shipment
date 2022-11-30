const ObjectId = require('mongodb').ObjectId;
const { query } = require('express');
const express = require('express')
const uuid = require('uuid')

const shipment = express.Router();

const Shipment = require('../routes/schemas/shipment')
const validate = require('express-jsonschema').validate;
const ValidationSchemas = require("../validation/login");

shipment.get("/get_shipments", async (req, res) => {

    console.log(req.params);

    let shipments = await Shipment.find({user_id: req.query.user_id },{__v:0})

    res.send({"shipments": shipments})
})

shipment.get("/get_shipment", async (req, res) => {

    console.log(req.params);

    let shipments = await Shipment.find({"user_id": req.query.user_id, "_id" : req.query.shipment_id },{__v:0})

    res.send({"shipments": shipments})
})

shipment.post("/create", validate({body:ValidationSchemas.shipmentSchema}),async (req, res)=> {

    const { source, destination, pickup_date, length, width, height, delivery_partners, package_details, address_details, status  } = req.body;

    let shipment = new Shipment({
        user_id: req.session.user_id,
        source: source,
        destination: destination,
        pickup_date: pickup_date,
        length: length,
        width : width,
        height : height,
        delivery_partners : delivery_partners,
        package_details : package_details,
        address_details : address_details,
        tracking_no : uuid.v4(),
        cd : new Date(),
        status : status

    })

    shipment = await shipment.save();

    res.send({status:true, data:[shipment], message:"Shipment saved successfully."})

});

shipment.patch("/update_shipment", async (req, res) => {

    const { source, destination, pickup_date, length, width, height, delivery_partners, package_details, address_details, status, shipment_id  } = req.body;

    if (!shipment_id) {
        return res.status(406).send({
            status: false,
            message: "shipment Id is required / It cannot be empty.",
        });
    }

    let updateObj = {};

    if(source) updateObj.source = source;
    if(pickup_date) updateObj.pickup_date = pickup_date;
    if(status) updateObj.status = status;
    if(destination) updateObj.destination = destination;
    if(length) updateObj.length = length;
    if(width) updateObj.width = width;
    if(height) updateObj.height = height;
    if(delivery_partners) updateObj.delivery_partners = delivery_partners;
    if(package_details) updateObj.package_details = package_details;
    if(address_details) updateObj.address_details = address_details;
    
    try {
        let response = await Shipment.findByIdAndUpdate(shipment_id, updateObj, {new: true});
        res.send({status: true, data: response, message: 'Successfully updated.'})
    } catch (error) {
        console.log(error);
        res.send({status: false, message: "Unable to update."})  
    }

})

shipment.delete("/delete_shipment", async (req,res)=> {

    try {
        let response = await Shipment.deleteOne({"_id":req.body.shipment_id});
        res.send({status:true, message: "Successfully Deleted."})
        
    } catch (error) {
        console.log(error)
        res.send({status:false, message:"Unable to delete the shipment."})
    }
    
})

module.exports = shipment;