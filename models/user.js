const mongoose = require("mongoose")
const passportLocalMongoose = require("passport-local-mongoose")


const userSchema = new mongoose.Schema({

    firstname: {
        type: String,
        required: true,
    },
    lastname: {
        type: String,
        required: true,
    },
    username: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    isOnline: {
        type: Boolean,
        required: false,
    },
    phoneNumber: {
        type: String,
        required: false,
    }
})

userSchema.plugin(passportLocalMongoose,{ usernameField: 'email'} )
module.exports.User = mongoose.model("User", userSchema)
module.exports.Employee = mongoose.model("Employee", userSchema)