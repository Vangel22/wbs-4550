const { read, write } = require("../read-write");

const getCars = async (req, res) => {
  try {
    const cars = await read("data.json");
    return res.status(200).send(cars);
  } catch (err) {
    console.log(err);
    return res.status(500).send("Invalid server error!");
  }
};

const createCar = async (req, res) => {
  try {
    const cars = await read("data.json");
    const newCar = req.body;
    cars.push(newCar);
    await write("data.json", cars);
    return res.status(200).send("New car added!");
  } catch (err) {
    console.log(err);
    return res.status(500).send("Invalid server error!");
  }
};

const updateCar = async (req, res) => {
  try {
    let cars = await read("data.json");
    const carId = Number(req.params.id); // Bidejki sekogas params drzi string za klucevite
    const newData = req.body;

    cars = cars.map((car, index) => {
      if (index === carId) {
        return {
          ...car,
          ...newData,
        };
      }

      return car; // ako go nemame ova site drugi avtomobili ke stanat null
    });

    await write("data.json", cars);
    return res.status(200).send("Car updated successfully!");
  } catch (err) {
    console.log(err);
    return res.status(500).send("Invalid server error!");
  }
};

const deleteCar = async (req, res) => {
  try {
    const carId = Number(req.params.id);
    let cars = await read("data.json");

    cars = cars.filter((_, index) => index !== carId); // Site drugi avtomobili osven so ovoj carId
    await write("data.json", cars);

    return res.status(200).send("Car deleted successfully!");
  } catch (err) {
    console.log(err);
    return res.status(500).send("Invalid server error!");
  }
};

module.exports = {
  getCars,
  createCar,
  updateCar,
  deleteCar,
};
