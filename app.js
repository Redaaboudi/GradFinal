require('dotenv').config()
const express = require("express");
const mongoose = require("mongoose");
const ejs = require("ejs")
const ejsMate = require("ejs-mate")
const path = require("path")
const session = require("express-session")
const flash = require("connect-flash")
const passport = require("passport")
const passportLocalMongoose = require("passport-local-mongoose");
const LocalStrategy = require('passport-local').Strategy;
const {User, Employee} = require("./models/user")
const { Booking } = require("./models/booking")



mongoose.connect(process.env.DATABASE_URL)
.then(() => {
    console.log("Connected To Database")
})
.catch((err) => {
    console.log("There is an error")
    console.log(err)
})





const app = express();




app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.engine("ejs", ejsMate);
app.set("view engine", "ejs");


const sessionConfig = {
    secret: process.env.SECRET_KEY,
    resave: false,
    saveUninitialized: true,
    cookie: {
        httpOnly: true,
        expires: Date.now() + 1000 * 60 * 60 * 24 * 7,
        maxAge: 1000 * 60 * 60 * 24 * 7,
    }
}


let isLoggedInUser = (req, res, next) => {
    if(!req.isAuthenticated()) {
        req.flash('error', 'You Must be logged in')
        return res.redirect("/signIn")
    }
    next()
}


let isLoggedInEmployee = (req, res, next) => {
    if(!req.isAuthenticated()) {
        req.flash('error', 'You Must be logged in')
        return res.redirect("/staffLogin")
    }
    next()
}


app.use(flash())
app.use(session(sessionConfig))
app.use(passport.initialize());
app.use(passport.session())







passport.use('user', new LocalStrategy({ usernameField: 'email' }, User.authenticate()));

// Local strategy for employees
passport.use('employee', new LocalStrategy({ usernameField: 'email' }, Employee.authenticate()));



// Serialize and deserialize functions for regular users
passport.serializeUser(function(user, done) {
     done(null, user); 
    });
  
passport.deserializeUser(function(user, done) {
    if(user!=null)
    done(null,user);
});









app.use((req, res, next)=> {
    
        res.locals.currentUser = req.user;
        res.locals.success = req.flash("success")
        res.locals.error = req.flash("error")
    
    next()
})


app.get("/home", (req, res) => {
    res.render("testing")
})


app.get("/booking", isLoggedInUser,(req,res) => {
    
    res.render("booking")
})

app.post("/booking", isLoggedInUser, async (req, res) => {
    const data = req.body
    const user = res.locals.currentUser
    const booking = new Booking({
        userInfo: user,
        service: data.service,
        city: data.city,
        district: data.district,
        detailedAddress: data.detailedAddress,
        time: `${data.hours}: ${data.minutes}`,
        date: `${data.day} / ${data.month}`,
        carMake: data.carMake,
        carModel: data.carModel,
        carSize: data.options,
        additionalNotes: data.additionalNotes,
    })
    await booking.save()
    res.redirect("/summary")
})


app.get("/confirm", async(req,res) => {
    const {_id} = res.locals.currentUser
    const booking = await Booking.find({ "userInfo._id": _id });
    const lastBookingNum = booking.length-1
    const lastBookingObj = booking[lastBookingNum]
    console.log(lastBookingObj)

    res.render("confirm", { lastBookingObj })
})




app.get("/summary", async (req,res) => {
    const {_id} = res.locals.currentUser
    const booking = await Booking.find({ "userInfo._id": _id });
    const lastBookingNum = booking.length-1
    const lastBookingObj = booking[lastBookingNum]
    console.log(lastBookingObj)


    res.render("summary", { lastBookingObj })
})



app.get("/signIn", (req,res) => {
    res.render("signIn")
})


app.post("/signIn" ,passport.authenticate('user', {successRedirect: "/home" ,failureRedirect: "/signIn"}))



app.get("/signUp", (req,res) => {
    res.render("signUp")
})


app.post("/signUp", async (req, res) => {
    try{
        const {firstname, lastname, email, password} = req.body
        const user = new User({firstname, lastname, email, username: firstname+lastname})
        const registerUser = await User.register(user, password)
        if(registerUser){
            console.log("User Registered")
        }
    }catch(e){
        console.log(e)
    }

    
})


app.get("/forgotPassword", (req,res) => {
    res.render("forgotPassword")
})


app.get("/resetPassword", (req,res) => {
    res.render("resetPassword")
})


app.get("/OTP", (req, res) => {
    res.render("OTP")
})





app.get("/staffLogin", (req,res) => {
    res.render("staffLogin")
})

app.post('/staffLogin', passport.authenticate('employee', {successRedirect: '/staffHome',failureRedirect: '/staffLogin' }));


app.get("/staffHome", isLoggedInEmployee ,(req,res) => {
   
    res.render("staffHome")
})

app.get("/staffRegister", (req,res) => {
    res.render("staffRegister")
})

app.post("/staffRegister", async (req,res) => {
    try{
        const {firstname, lastname, email, password} = req.body
        const employee = new Employee({firstname,lastname,email,username: firstname+lastname})
        const registerUser = await Employee.register(employee, password)
        if (registerUser) {
            console.log("Registered")
            res.redirect("/staffLogin")
        }
    }catch(e) {
        console.log(e)
    }
})





app.get("/terms", (req,res) => {
    res.render("terms")
})


app.get("/payment", (req,res) => {
    res.render("payment")
})


app.get("/policy", (req,res) => {
    res.render("policy")
})


app.get("/startOrder", (req,res) => {
    res.render("startOrder")
})

app.get("/goOnline", async (req, res) => {
    const { _id } = res.locals.currentUser
    await Employee.findByIdAndUpdate(_id, {
        isOnline: true
    })
    res.locals.currentUser.isOnline = true
    res.redirect("/staffHome")
})

app.get("/goOffline", async (req, res) => {
    const { _id } = res.locals.currentUser
    await Employee.findByIdAndUpdate(_id, {
        isOnline: false
    })
    res.locals.currentUser.isOnline = false
    res.redirect("/staffHome")
})

app.get("/logout", (req, res, next) => {
    req.logout(async (e) => {
        if(e) {
            return next(e);
        }
        const employee = await Employee.findByIdAndUpdate(res.locals.currentUser._id)
        if(employee){
            await Employee.findByIdAndUpdate(res.locals.currentUser._id,{
                isOnline: false
            })
        }
        res.redirect("/home")
    })
})

















app.listen(3000, () => {
    console.log("listening on port 3000")
})
