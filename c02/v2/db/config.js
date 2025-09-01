const mongoose = require("mongoose");
// ODM - Object data mapping - Non-relational DB
// ORM - Object relation mapper -Relational DB

const uri = "";
async function connect() {
  try {
    await mongoose.connect(uri);
    console.log("MongoDB connected!");
  } catch (err) {
    console.error(err);
  }
}

module.exports = connect;
