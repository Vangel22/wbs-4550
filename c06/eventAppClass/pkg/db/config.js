const mongoose = require("mongoose");
const { getSection } = require("../config");

const { MONGO_USERNAME, MONGO_PASSWORD, MONGO_DATABASE } =
  getSection("development");

const uri = `mongodb+srv://${MONGO_USERNAME}:${MONGO_PASSWORD}@cluster0.z5ttbkq.mongodb.net/${MONGO_DATABASE}?retryWrites=true&w=majority&appName=Cluster0`;
async function connect() {
  try {
    await mongoose.connect(uri);
    console.log("MongoDB connected!");
  } catch (err) {
    console.error(err);
  }
}

module.exports = connect;