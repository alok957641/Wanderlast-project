const Listing = require("../models/listing.js");


// index route 
module.exports.index = async (req, res) => {

    const alllisting = await Listing.find({})

    res.render("listing/index", { alllisting });

}



// new route 

module.exports.newlistingform = (req, res) => {

    res.render("listing/new.ejs");

}

// show route 

module.exports.showroute = async (req, res) => {
    let { id } = req.params;
    const showlisting = await Listing.findById(id).populate({
        path: "review", populate: {
            path: "author",
        }
    }).populate("owner");

    console.log(showlisting);
    res.render("listing/show.ejs", { showlisting });
};


// new listing 

module.exports.newlisting = async (req, res,) => {

    let url = req.file.path;
    let filename = req.file.filename;
    console.log(url, "...", filename);
    if (!req.body.listing) {
        throw new ExpressError(400, "send valid deta for listing ");
    }
    const newlisting = new Listing(req.body.listing);
    newlisting.owner = req.user._id;
    newlisting.image = { url, filename };
    await newlisting.save();
    req.flash("success", "new Listing Created ");
    res.redirect("/listing")


}


// edit route 
module.exports.editroute = async (req, res) => {
    let { id } = req.params;
    const listing = await Listing.findById(id);
    
   let orignalimg = listing.image.url;
   orignalimg = orignalimg.replace("upload", "upload/h_300,w_300")

    res.render("listing/edit.ejs", { listing , orignalimg});

}




// update route 
module.exports.updateroute = async (req, res) => {


    if (!req.body.listing) {
        throw new ExpressError(400, "send valid deta for listing ");
    }

    const { id } = req.params;
    const listing = await Listing.findByIdAndUpdate(id, req.body.listing, { new: true, runValidators: true });
    if (typeof req.file !== "undefined") {
        let url = req.file.path;
        let filename = req.file.filename;
        listing.image = { url, filename };
        await listing.save();
    }
    req.flash("success", " listing updated");
    res.redirect(`/listing/${id}`);
}



// delete route 
module.exports.deleteroute = async (req, res) => {
    let { id } = req.params;
    await Listing.findByIdAndDelete(id);
    req.flash("success", "Listing Deleted  ");
    res.redirect("/listing");
}