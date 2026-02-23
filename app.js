if (process.env.NODE_ENV != "production") {
    require('dotenv').config();
}

console.log(process.env.SECRET);



const express = require("express");
const app = express();
const mongoose = require("mongoose");
const path = require("path");
const methodOverride = require("method-override");
const ejsMate = require("ejs-mate");
const ExpressError = require("./utils/ExpressError.js");
const session = require("express-session");
const MongoStore = require("connect-mongo");
const flash = require("connect-flash");
const passport = require("passport");
const LocalStrategy = require("passport-local");
const User = require("./models/user");







app.use(express.static(path.join(__dirname, "public")));

app.engine("ejs", ejsMate);
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));
app.use(express.static(path.join(__dirname, "/public")));

const dburl = process.env.ATLASDB_URL;

main().then(res => {
    console.log("connected succes mongodb")
}).catch(err => { console.log(err) });


async function main() {

    await mongoose.connect(dburl);

}

const store = MongoStore.create({
    mongoUrl: dburl,
    secret:process.env.SECRET,
    touchAfter: 24 * 3600,
});


store.on("error", (err) => {
    console.log("SESSION STORE ERROR:", err);
});

const sessionOption = {
    store,
    secret:process.env.SECRET,
    resave: false,
    saveUninitialized: true,

    cookie: {
        expires: Date.now() + 7 * 24 * 60 * 60 * 1000,
        MaxAge: 7 * 24 * 60 * 60 * 1000,
        httpOnly: true

    },
};


app.use(session(sessionOption));
app.use(flash());

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());


app.use((req, res, next) => {
    res.locals.error = req.flash("error");
    res.locals.success = req.flash("success");
    res.locals.curruser = req.user;
    next();
});


// app.get("/registeruser" , async(req ,res) => {
//     let fakeuser = new User ({
//         email:"rajalok@gmail.com",
//         username:"rajalok69"
//     });
//     let newUser  = await User.register(fakeuser , "alok12345@#");
//     res.send(newUser);
// })

const listing = require("./routes/listing.js");
const review = require("./routes/review.js");
const user = require("./routes/user.js");



app.use("/listing/:id/:review", review);
app.use("/", user);
app.use("/listing", listing);


app.use((req, res, next) => {
    next(new ExpressError(404, "Page Not Found"));
});


// middlewwear 
app.use((err, req, res, next) => {
    const statusCode = err.statusCode || 500;
    const message = err.message || "Something went wrong";
    res.status(statusCode).render("error/error.ejs", { err });
});




app.listen(8080, () => {
    console.log("server is listening on port 8080");
});


