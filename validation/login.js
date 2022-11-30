const loginSchema = {
    "required": ['email', 'password'],
    "type": 'object',
    "additionalProperties": false,
    "properties": {

        "email": {
            "type": "string",
            "format": "email"
        },
        "password": {
            "type": "string"
        }
    }
}

const getShipmentSchema = {
    "required": ['user_id'],
    "type": 'object',
    "additionalProperties": false,
    "properties": {
        "user_id": {
            "type": "string",
            "format": "uuid"
        }
    }
}

const shipmentSchema = {
    "type": 'object',
    "required": ['source', 'destination', 'pickup_date', 'length', 'width', 'height', "package_details", "address_details", 'delivery_partner'],
    "additionalProperties": false,
    "properties": {
        "source": {
            "type": "string"
        },
        "destination": {
            "type": "string"
        },
        "pickup_date": {
            "type": "string",
            "format": "date"
        },
        "length": {
            "type": "string"
        },
        "width": {
            "type": "string"
        },
        "height": {
            "type": "string"
        },
        "package_details": {
            "type": "object",
            "requried": ["title", "sku", "weight", "height", "length"],
            "properties": {
                "title": {
                    "type": "string"
                },
                "sku": {
                    "type": "string"
                },
                "length": {
                    "type": "string"
                },
                "width": {
                    "type": "string"
                },
                "height": {
                    "type": "string"
                },
            }
        },
        "address_details": {
            "type": "object",
            "requried": ["source_address", "destination_address"],
            "properties": {
                "source_details": {
                    "type": "object",
                    "requried": ["name", "pincode", "phone", "district", "state", "country"],
                    "properties": {
                        "name": {
                            "type": "string",
                            "minLength": 1
                        },
                        "pincode": {
                            "type": "string"
                        },
                        "phone": {
                            "type": "string"
                        },
                        "district": {
                            "type": "string"
                        },
                        "state": {
                            "type": "string"
                        },
                        "country": {
                            "type": "string"
                        }

                    }
                },
                "destination_address": {
                    "type": "object",
                    "requried": ["name", "pincode", "phone", "district", "state", "country"],
                    "properties": {
                        "name": {
                            "type": "string",
                            "minLength": 1
                        },
                        "pincode": {
                            "type": "string"
                        },
                        "phone": {
                            "type": "string"
                        },
                        "district": {
                            "type": "string"
                        },
                        "state": {
                            "type": "string"
                        },
                        "country": {
                            "type": "string"
                        }

                    }
                }
            }
        },
        "delivery_partner": {
            "type": "string"
        },
        "status": {
            "type": "string",
            "enum": ["Created", 'Pickup', 'In Transit', 'Delivered'],
            "default": "Created"
        }

    }
}

const updateShipmentSchema = {
    "type": 'object',
    "additionalProperties": false,
    "required": ["shipment_id", "status"],
    "properties": {
        "shipment_id": {
            "type": "string"
        },
        "source": {
            "type": "string"
        },
        "destination": {
            "type": "string"
        },
        "pickup_date": {
            "type": "string",
            "format": "date"
        },
        "length": {
            "type": "string"
        },
        "width": {
            "type": "string"
        },
        "height": {
            "type": "string"
        },
        "package_details": {
            "type": "object",
            "requried": ["title", "sku", "weight", "height", "length"],
            "properties": {
                "title": {
                    "type": "string"
                },
                "sku": {
                    "type": "string"
                },
                "length": {
                    "type": "string"
                },
                "width": {
                    "type": "string"
                },
                "height": {
                    "type": "string"
                },
            }
        },
        "address_details": {
            "type": "object",
            "requried": ["source_address", "destination_address"],
            "properties": {
                "source_details": {
                    "type": "object",
                    "requried": ["name", "pincode", "phone", "district", "state", "country"],
                    "properties": {
                        "name": {
                            "type": "string",
                            "minLength": 1
                        },
                        "pincode": {
                            "type": "string"
                        },
                        "phone": {
                            "type": "string"
                        },
                        "district": {
                            "type": "string"
                        },
                        "state": {
                            "type": "string"
                        },
                        "country": {
                            "type": "string"
                        }

                    }
                }

                ,
                "destination_address": {
                    "type": "object",
                    "requried": ["name", "pincode", "phone", "district", "state", "country"],
                    "properties": {
                        "name": {
                            "type": "string",
                            "minLength": 1
                        },
                        "pincode": {
                            "type": "string"
                        },
                        "phone": {
                            "type": "string"
                        },
                        "district": {
                            "type": "string"
                        },
                        "state": {
                            "type": "string"
                        },
                        "country": {
                            "type": "string"
                        }

                    }
                }
            }
        },
        "delivery_partner": {
            "type": "string"
        },
        "status": {
            "type": "string",
            "enum": ["Created", 'Pickup', 'In Transit', 'Delivered'],
            "default": "Created"
        }
    }
}

const updateShipment = {
    "type": 'object',
    "additionalProperties": false,
    "required": ["shipment_id", "status"],
    "properties": {
        "shipment_id": {
            "type": "string"
        },
        "status": {
            "type": "string",
            "enum": ["Created", 'Pickup', 'In Transit', 'Delivered']
        }
    }
}

const updateStatus = {
    "type": 'object',
    "additionalProperties": false,
    "required": ["user_id", "user_status"],
    "properties": {
        "user_id": {
            "type": "string"
        },
        "user_status": {
            "type": "string",
            "enum": ["Active", "In Active"]
        }
    }
}

const registerUserSchema = {
    "required": ['name', "email", "password", 'phone', 'address', 'company_name', 'gstin', 'role', 'district', 'state', 'country'],
    "type": 'object',
    "additionalProperties": false,
    "properties": {
        "name": {
            "type": "string",
            "minLength": 1
        },
        "email": {
            "type": "string",
            "format": "email"
        },
        "password": {
            "type": "string",
            "minLength": 6
        },
        "phone": {
            "type": "string"
        },
        "address": {
            "type": "string"
        },
        "company_name": {
            "type": "string"
        },
        "gstin": {
            "type": "string"
        },
        "district": {
            "type": "string"
        },
        "state": {
            "type": "string"
        },
        "country": {
            "type": "string"
        },
        "role": {
            "type": "string",
            "enum": ["Customer", "Delivery Partner"]
        }
    }
}

const deleteShipmentSchema = {
    "required": ['task_id'],
    "type": 'object',
    "additionalProperties": false,
    "properties": {
        "task_id": {
            "type": "string"
        }
    }
}

module.exports = { loginSchema, getShipmentSchema, shipmentSchema, updateShipmentSchema, registerUserSchema, deleteShipmentSchema, updateShipment, updateStatus }