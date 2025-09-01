const express = require("express");

const connectMongo = require("./db/config");
const {
  getCars,
  getSingleCar,
  removeCar,
  createCar,
  updateCar,
} = require("./handlers/carsHandler");
connectMongo();

const app = express();

app.use(express.json());

// Ruti
app.get("/cars", getCars);
app.get("/cars/:id", getSingleCar);
app.delete("/cars/:id", removeCar);

// Create
app.post("/cars", createCar);
// update
app.put("/cars/:id", updateCar);

app.listen(3000, () => {
  console.log("Server started at port 3000!");
});
