const mongoose = require("mongoose");

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

// Account.pre("save", () => {})
// Account.post("save", () => {})

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

module.exports = {
  get,
  getByEmail,
  create,
  update,
  remove,
};
