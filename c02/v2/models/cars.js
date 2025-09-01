const mongoose = require("mongoose");

const carSchema = mongoose.Schema({
  // definirajte spored v1/data.json
  brand: {
    type: String,
    required: true,
  },
  model: String,
  year: Number,
});

const CarModel = mongoose.model("Car", carSchema, "cars");

const get = async () => {
  return await CarModel.find();
};

const getById = async (_id) => {
  // req.params.id
  return await CarModel.findOne({ _id });
};

const create = async (data) => {
  // req.body
  const newCar = new CarModel(data);
  return await newCar.save();
};
const update = async (_id, data) => {
  // req.params.id, req.body
  return await CarModel.updateOne({ _id }, data);
};
const remove = async (_id) => {
  return await CarModel.deleteOne({ _id });
};

module.exports = {
  get,
  getById,
  create,
  update,
  remove,
};
