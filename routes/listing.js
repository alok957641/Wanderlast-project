const express = require("express");
const router =  express.Router();
const WrapAsync = require("../utils/WrapAsync.js");
const ExpressError = require("../utils/ExpressError.js");
const Listing = require("../models/listing.js");
const Review = require("../models/Review.js");
const {isLoggedIn , iswoner , } = require("../middlewear.js");
const listingcontroller = require("../controller/listing.js")
const multer  = require('multer')
const {storage} = require("../cloudConfig.js")
const upload = multer({ storage })

// Index Route

router.get("/", WrapAsync(listingcontroller.index));


// create new route  
router.get("/new", isLoggedIn ,  listingcontroller.newlistingform);


// Show route 
router.get("/:id",  WrapAsync(listingcontroller.showroute));


// new listing 
router.post("/",isLoggedIn , upload.single("listing[image]"),  WrapAsync(listingcontroller.newlisting))



// edit route 
router.get("/:id/edit",isLoggedIn,   WrapAsync(listingcontroller.editroute))


// update route 
router.put("/:id",isLoggedIn ,iswoner, upload.single("listing[image]"),    WrapAsync(listingcontroller.updateroute));


// Delete listing route 
router.delete("/:id",isLoggedIn , iswoner , listingcontroller.deleteroute );


module.exports = router ;