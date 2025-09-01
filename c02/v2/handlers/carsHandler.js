const { get, getById, remove } = require("../models/cars");

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
  } catch (err) {
    return res.status(500).send("Internal server error!");
  }
};

const updateCar = async (req, res) => {
  try {
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
