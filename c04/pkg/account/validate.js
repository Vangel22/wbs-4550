const { Validator } = require("node-input-validator");

const AccountLogin = {
  email: "required|email",
  password: "required|string",
};

// Realen primer vo softver koj se koristi
const AccountRegister = {
  username: "required|string",
  email: "required|email",
  password: "required|string",
  confirmPassword: "required|string",
};

// CRUD funkcionalnost na chas
const AccountCreate = {
  username: "required|string",
  email: "required|email",
  password: "required|string",
};

const AccountUpdate = {
  username: "string",
  email: "email",
  password: "string",
};

// data -> req.body, schema -> AccountCreate schema
const validateAccount = async (data, schema) => {
  const validator = new Validator(data, schema);
  const matched = await validator.check();

  if (!matched) {
    throw {
      code: 400,
      error: validator.errors,
    };
  }
};

module.exports = {
  AccountLogin,
  AccountRegister,
  AccountCreate,
  AccountUpdate,
  validateAccount,
};
