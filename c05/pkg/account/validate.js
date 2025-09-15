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

module.exports = {
  AccountLogin,
  AccountRegister,
  AccountCreate,
  AccountUpdate,
};
