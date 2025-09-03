const bcryptjs = require("bcryptjs");
const { get, create, update, remove } = require("../models/accounts");
const {
  validateAccount,
  AccountCreate,
  AccountUpdate,
} = require("../models/validate");

const getAllAccounts = async (req, res) => {
  try {
    const accounts = await get();
    return res.status(200).send(accounts);
  } catch (err) {
    return res.status(500).send("Internal server error!");
  }
};

const createAccount = async (req, res) => {
  try {
    await validateAccount(req.body, AccountCreate);
    const data = {
      ...req.body,
      password: bcryptjs.hashSync(req.body.password),
    };
    await create(data);
    return res.status(200).send("Account created!");
  } catch (err) {
    console.log("validate.js error", err);
    return res.status(500).send("Internal server error!");
  }
};

const updateAccount = async (req, res) => {
  try {
    await validateAccount(req.body, AccountUpdate);
    await update(req.params.id, req.body);
    return res.status(200).send("Account updated!");
  } catch (err) {
    return res.status(500).send("Internal server error!");
  }
};

const removeAccount = async (req, res) => {
  try {
    await remove(req.params.id);
    return res.status(200).send("Account deleted!");
  } catch (err) {
    return res.status(500).send("Internal server error!");
  }
};

module.exports = {
  getAllAccounts,
  createAccount,
  updateAccount,
  removeAccount,
};
