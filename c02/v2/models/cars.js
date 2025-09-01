const mongoose = require("mongoose");

const carSchema = mongoose.Schema({
  // definirajte spored v1/data.json
});

const CarModel = mongoose.model("Car", carSchema, "cars");

const get = async () => {};
const create = async () => {};
const update = async () => {};
const remove = async () => {};

module.exports = {
  get,
  create,
  update,
  remove,
};
