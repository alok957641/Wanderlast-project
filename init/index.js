const mongoose = require("mongoose");
const Listing = require("../models/listing.js");
const initData = require("./deta.js");

main()
  .then(() => {
    console.log("connected succes mongodb");
  })
  .catch((err) => console.log(err));

async function main() {
  await mongoose.connect("mongodb://127.0.0.1:27017/Wanderlast");
}

const initDB = async () => {
  await Listing.deleteMany({});
  initData.data = initData.data.map((obj) => ({...obj , owner:"6996d18e3680ce117eb48db1"}))
  await Listing.insertMany(initData.data); 
  console.log("data was initialized");
};

initDB();
