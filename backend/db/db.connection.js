const mongoose = require("mongoose");
require("dotenv").config();

const mongoUri = process.env.MONGO_URI;

const initializeDatabase = async () =>{
await mongoose
  .connect(mongoUri, {
      useNewUrlParser: true,
      useUnifiedTopology: true
  })
  .then(() => {
    console.log("Connected to database");
  })
  .catch((error) => console.log("Error connected to the Databse", error));

};

module.exports = {initializeDatabase};