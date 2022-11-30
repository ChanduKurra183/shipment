const mongoose = require('mongoose')
let Schema = mongoose.Schema

let shipment = new Schema({

    user_id: {
        type:String,
        required: true
    },
    source:{
        type:String,
        required: true
    },
    destination:{
        type:String,
        required: true
    },
    delivery_partners: { //how to get dynamic names
        type: String,
        enum:[],
        default:"" ,
    },
    pickup_date: {
        type: Date,
        require: true,
        default: new Date()
    },
    length:{
        type:String,
        required: true
    },
    width:{
        type:String,
        required: true
    },
    height:{
        type:String,
        required: true
    },
    package_details:{
        type:Object,
        required: true,
        "properties":{
            title:{
                type:String,
                required:true
            },
            sku:{
                type:String,
                required: true
            },
            weight:{
                type:String,
                required: true
            },
            length:{
                type:String,
                required: true
            }
        }
    },
    address_details: {
        type: Object,
        required : ["source_address", "destination_address"],
        "properties":{
            source_address:{
                type:Object,
                "properties":{
                    name:{
                        type:String,
                        required:true
                    },
                    phone:{
                        type:String,
                        required: true
                    },
                    pincode:{
                        type:String,
                        required: true
                    },
                    district:{
                        type:String,
                        required: true
                    },
                    state:{
                        type:String,
                        required:true
                    },
                    country:{
                        type:String,
                        required:true
                    }
                    
                }
            },
            destination_address:{
                type:Object,
                "properties":{
                    name:{
                        type:String,
                        required:true
                    },
                    phone:{
                        type:String,
                        required: true
                    },
                    pincode:{
                        type:String,
                        required: true
                    },
                    district:{
                        type:String,
                        required: true
                    },
                    state:{
                        type:String,
                        required:true
                    },
                    country:{
                        type:String,
                        required:true
                    }
                    
                }
            }
            
        }
    },
    status : {
        type : String,
        enum:["Created", 'pickup', 'in Transit', 'Delivered'],
        default:"Created"
    },
    tracking_no : {
        type : String,
        required: true
    }

})

module.exports = mongoose.model('shipment', shipment);