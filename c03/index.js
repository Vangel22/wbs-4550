const express = require("express");

const app = express();

app.use(express.json()); // vo req.body da imame json format

// app.get("/accounts")

app.listen(3000, () => console.log("Server started at port 3000!"));
