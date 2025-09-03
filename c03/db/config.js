const mongoose = require("mongoose");
// ODM - Object data mapping - Non-relational DB
// ORM - Object relation mapper -Relational DB

const uri =
  "mongodb+srv://Vangel22:test1234@cluster0.12jzasd.mongodb.net/grupa-4548?retryWrites=true&w=majority&appName=Cluster0";
async function connect() {
  try {
    await mongoose.connect(uri);
    console.log("MongoDB connected!");
  } catch (err) {
    console.error(err);
  }
}

module.exports = connect;
