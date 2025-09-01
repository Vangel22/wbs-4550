const express = require("express");

const connectMongo = require("./db/config");
connectMongo();

const app = express();

app.use(express.json());

// Ruti

app.listen(3000, () => {
  console.log("Server started at port 3000!");
});
