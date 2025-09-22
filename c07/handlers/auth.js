const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");

const { getByEmail, create } = require("../models/account");
const { AccountLogin, AccountRegister } = require("../models/account/validate");
const { getSection } = require("../pkg/config");
const { validateSchema } = require("../helper/validation");

const login = async (req, res) => {
  try {
    await validateSchema(req.body, AccountLogin);
    const { email, password } = req.body;

    const account = await getByEmail(email);

    if (!account) {
      return res.status(404).send("Account not found!");
    }

    // Lozinkata e enkriptirana vo nasata databaza
    if (!bcryptjs.compareSync(password, account.password)) {
      // await logFailedAttempt(account._id, account.logFailed + 1);
      return res.status(400).send("Wrong password!");
    }

    // req.auth
    const payload = {
      username: account.username,
      email: account.email,
      id: account._id,
      // new Date() - od 01.01.1970 Unix do denes 10.09.2025 - go vrakja vremeto vo milisekundi
      // new Date() / 1000 - od 01.01.1970 Unix do denes 10.09.2025 - go vrakja vremeto vo sekundi
      // 7 * 24 * 60 * 60 - 7 dena, 24 chasa, 60 min, 60s
      exp: new Date() / 1000 + 7 * 24 * 60 * 60,
      // exp ke bide 7 denovi vo idnina
    };

    const token = jwt.sign(payload, getSection("development").jwt_secret);
    // if (token) {
    // await logSuccessAttempt(account._id, account.logSuccess + 1);
    // }
    return res.status(200).send({ token });
  } catch (err) {
    console.log(err);
    return res.status(500).send("Invalid Server Error");
  }
};

const register = async (req, res) => {
  try {
    await validateSchema(req.body, AccountRegister);
    const { username, email, password, confirmPassword } = req.body;

    if (password !== confirmPassword) {
      return res.status(400).send("Passwords do not match!");
    }

    const account = await getByEmail(email);

    if (account) {
      return res.status(400).send("Account is already registered!");
    }

    const data = {
      username,
      email,
      password: bcryptjs.hashSync(password),
    };

    const newAccount = await create(data);
    return res.status(200).send(newAccount);
  } catch (err) {
    console.log(err);
    return res.status(500).send("Invalid Server Error");
  }
};

const refreshToken = async (req, res) => {
  try {
    const payload = {
      ...req.auth, // momentalniot najaven korisnik t.e payload-ot od linija 27
      exp: new Date() / 1000 + 7 * 24 * 60 * 60,
    };

    const token = jwt.sign(payload, getSection("development").jwt_secret);
    return res.status(200).send({ token });
  } catch (err) {
    console.log(err);
    return res.status(500).send("Invalid Server Error");
  }
};

module.exports = {
  login,
  register,
  refreshToken,
};
