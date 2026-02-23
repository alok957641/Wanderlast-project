const mongoose = require("mongoose");
const Review = require("./Review");
const { Type } = require("lucide-react");
const user = require("./user");
const Schema = mongoose.Schema ; 



const listingSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },

  description: {
    type: String,
    required: true
  },

  image: {
    filename: String,
  
    url: String,
  },

  price: Number,
  location: String,
  country: String,
 
  review :[
    {
    type :  Schema.Types.ObjectId,
    ref :"Review"
  }
  ],

  owner : {
    type:Schema.Types.ObjectId, 
    ref:"User"
  }

});


listingSchema.post("findOneAndDelete", async(listing) => {
  if(listing){
    await Review.deleteMany({ _id:{ $in : listing.review }})

  }
});


const Listing = mongoose.model("Listing", listingSchema);
module.exports = Listing;
