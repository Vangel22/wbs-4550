const { Validator } = require("node-input-validator");

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
  AccountCreate,
  AccountUpdate,
  validateAccount,
};
