const express = require("express");
const router =  express.Router({mergeParams:true });
const Review = require("../models/Review.js");
const Listing = require("../models/listing.js");
const WrapAsync = require("../utils/WrapAsync.js");
const ExpressError = require("../utils/ExpressError.js");
const {isLoggedIn ,isreviewauthor} = require("../middlewear.js");
const reviewcontroller = require("../controller/review.js");


// rewiew route 
router.post("/", isLoggedIn , reviewcontroller.createreview );


// rating delete reviews 

router.delete("/:reviewId", isLoggedIn ,isreviewauthor ,   WrapAsync(reviewcontroller.deletereview));


module.exports = router ; 