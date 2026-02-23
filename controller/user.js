const User = require("../models/user");
const passport = require("passport");


// signup form 
module.exports.signupform = (req, res) => {
    res.render("./user/signup.ejs");

}

// signup
module.exports.signup = async (req, res, next) => {
    try {
        let { username, email, password } = req.body;
        const newUser = new User({ username, email });
        const registeruser = await User.register(newUser, password);
        console.log(registeruser);
        req.login(registeruser, (err) => {
            if (err) {
                return next(err);
            }
            req.flash("success", "Welcome to wanderlast");
            res.redirect("/listing");
        })
    }
    catch (err) {
        req.flash("error", err.message);
        res.redirect("/signup");
    }
}

// login form 
module.exports.loginform = (req, res) => {
    res.render("./user/login.ejs");
} ; 


// login

module.exports.login =   async (req, res) => {
        req.flash("success", "Welcome Back To Wanderlast!");
          res.redirect(res.locals.redirectUrl || "/listing");

    }



    module.exports.logout = (req, res, next) => {
    req.logout((err) => {
        if (err) {
            return next(err);
        }

        req.flash("success", "Logged Out ");
        res.redirect("/listing");
    })
}