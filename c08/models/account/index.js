const mongoose = require("mongoose");
const bcryptjs = require("bcryptjs");

const accountSchema = mongoose.Schema({
  username: {
    type: String,
    unique: true,
  },
  email: {
    type: String,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
});

const Account = mongoose.model("Account", accountSchema, "accounts");

// pred da go zacuvame korisnikot
accountSchema.pre("save", function (next) {
  // account - koj doagja od create(data) funkcijata
  this.password = bcryptjs.hashSync(this.password);
  next();
});

// otkako ke go zacuvame korisnikot
// accountSchema.post

const get = async () => {
  return await Account.find();
};

const getByEmail = async (email) => {
  return await Account.findOne({ email });
};

const create = async (data) => {
  const newAccount = new Account(data);
  return await newAccount.save();
};

const update = async (_id, data) => {
  return await Account.updateOne({ _id }, data);
};

const remove = async (_id) => {
  return await Account.deleteOne({ _id });
};

const setNewPassword = async (_id, password) => {
  return await Account.updateOne({ _id }, { password });
};

module.exports = {
  get,
  getByEmail,
  create,
  update,
  remove,
  setNewPassword,
};
