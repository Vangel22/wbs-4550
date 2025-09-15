const { Validator } = require("node-input-validator");

const validateSchema = async (data, schema) => {
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
  validateSchema,
};
