const Review = require("../models/Review.js");
const Listing = require("../models/listing.js");



module.exports.createreview = async (req, res) => {
    let listing = await Listing.findById(req.params.id);
    let newReview = new Review(req.body.review)
     newReview.author = req.user._id ; 
    listing.review.push(newReview);

    await newReview.save();
    await listing.save();

    console.log("new reviews save ");
     req.flash("success","new Review Created ");
    res.redirect(`/listing/${listing._id}`);
}


module.exports.deletereview = async (req, res) => {

    let { id, reviewId } = req.params;
    await Listing.findByIdAndUpdate(id, {
        $pull: { reviews: reviewId }
    });
    await Review.findByIdAndDelete(reviewId);
 req.flash("success","  Review Deleted  ");
    res.redirect(`/listing/${id}`);

}