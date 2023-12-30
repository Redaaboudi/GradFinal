const mongoose = require("mongoose")

const bookingSchema = new mongoose.Schema({
    userInfo: {
        type: Array,
        reqiured: true
    },    
    service: {
        type: String,
        required: true
    },
    city: {
        type: String,
        required: true
    },
    district: {
        type: String,
        required: true
    },
    detailedAddress: {
        type: String,
        required: false
    }, 
    date: {
        type: String,
        required: true
    }, 
    time: {
        type: String,
        required: true
    }, 
    carMake: {
        type: String,
        required: true
    },
    carModel: {
        type: String,
        required: true
    },
    carSize: {
        type: String,
        required: true
    },
    additionalNotes: {
        type: String,
        requires: false
    }
})

module.exports.Booking = mongoose.model("Booking", bookingSchema)