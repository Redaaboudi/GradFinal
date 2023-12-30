const mongoose = require("mongoose");
const passPortLocalMongoose = require("passport-local-mongoose");

mongoose.connect("mongodb+srv://redaaboudi:Redaaboudi.2002@cluster0.vqvug30.mongodb.net/washMeDB")
.then(() => {
    console.log("Connected to Database")
})
.catch((err) => {
    console.log("There is an error")
    console.log(err)
})

const db = mongoose.connection;

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true
    }
})

userSchema.plugin(passPortLocalMongoose)

const User = mongoose.model("User", userSchema);

async function seedDB ()  {
    try {
        const user = new User({
            email: "reda@gmail.com", 
            username: "Reda"
        })
        const registerUser = await User.register(user, "REDA")
        if (registerUser) {
            console.log("User Registered")
        }
    }catch (err){
        console.log(err)
    }
}

seedDB()
.then(()=>{
    db.close()
})