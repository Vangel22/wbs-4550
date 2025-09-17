const mongoose = require("mongoose");

const petsSchema = mongoose.Schema({
  owner: {
    default: null,
  },
});
