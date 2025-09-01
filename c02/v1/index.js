const express = require("express");
const { getCars, createCar, updateCar, deleteCar } = require("./handlers/cars");

const app = express();

app.use(express.json()); //req.body da moze da go procita vo JSON

app.get("/cars", getCars);
app.post("/cars", createCar);
app.put("/cars/:id", updateCar);
app.delete("/cars/:id", deleteCar);

app.listen(3000, () => console.log("Server started at port 3000."));
