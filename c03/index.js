const express = require("express");
// const connectDB = require("./db/config");
// connectDB();
//curry function
require("./db/config")();

const {
  getAllAccounts,
  createAccount,
  updateAccount,
  removeAccount,
} = require("./handlers/accountController");

const app = express();

app.use(express.json()); // vo req.body da imame json format
// CORS policy - razgledajte

app.get("/accounts", getAllAccounts);
app.post("/accounts", createAccount);
app.put("/accounts/:id", updateAccount);
app.delete("/accounts/:id", removeAccount);

app.listen(3000, () => console.log("Server started at port 3000!"));
