const { get, getById, remove, create, update } = require("../models/cars");

const getCars = async (req, res) => {
  try {
    const cars = await get();
    return res.status(200).send(cars);
  } catch (err) {
    return res.status(500).send("Internal server error!");
  }
};

const getSingleCar = async (req, res) => {
  try {
    const carId = req.params.id;
    const foundCar = await getById(carId);
    return res.status(200).send(foundCar);
  } catch (err) {
    return res.status(500).send("Internal server error!");
  }
};

const createCar = async (req, res) => {
  try {
    await create(req.body);
    return res.status(200).send("Car added successfully!");
  } catch (err) {
    return res.status(500).send("Internal server error!");
  }
};

const updateCar = async (req, res) => {
  try {
    await update(req.params.id, req.body);
    return res.status(200).send("Car updated successfully!");
  } catch (err) {
    return res.status(500).send("Internal server error!");
  }
};

const removeCar = async (req, res) => {
  try {
    const carId = req.params.id;
    await remove(carId);
    return res.status(200).send("Car deleted successfully!");
  } catch (err) {
    return res.status(500).send("Internal server error!");
  }
};

module.exports = {
  getCars,
  getSingleCar,
  updateCar,
  createCar,
  removeCar,
};
