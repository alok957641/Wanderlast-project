
const mongoose = require("mongoose");
const User = require("../models/user");




const ReviewSchema = new mongoose.Schema({
    comment:String ,
    rating :{
        type :Number , 
        min  :1 ,
        max : 5 ,
    },
    creratedAt: {
        type:Date , 
        default : Date.now() ,
    },

    author:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
    }

    
})




module.exports =  mongoose.model("Review", ReviewSchema);