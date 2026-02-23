const express = require("express");
const router = express.Router();
const User = require("../models/user");
const WrapAsync = require("../utils/WrapAsync");
const passport = require("passport");
const { saveredirectUrl } = require("../middlewear");
const usercontroler = require("../controller/user");



router.get("/signup", usercontroler.signupform)

router.post("/signup", WrapAsync(usercontroler.signup));



router.get("/login", usercontroler.loginform);


router.post("/login", saveredirectUrl,

    passport.authenticate("local", {
        failureRedirect: "/login",
        failureFlash: true,
    }), usercontroler.login
);


router.get("/logout", usercontroler.logout);

module.exports = router;