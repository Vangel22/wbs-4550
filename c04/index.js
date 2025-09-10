const express = require("express");
const { expressjwt: jwt } = require("express-jwt");

require("./pkg/db/config")();
const { getSection } = require("./pkg/config");
const { login, register, refreshToken } = require("./handlers/auth");

const app = express();
app.use(express.json());

app.use(
  jwt({
    secret: getSection("development").jwt_secret,
    algorithms: ["HS256"],
  }).unless({
    // za ovie pateki ne proveruvaj dali imaat jwt token
    path: ["/auth/login", "/auth/register"],
  })
);

// Nema da dozvoli da ja vidime porakata bez token
app.get("/", (res) => {
  res.send("Hello world!");
});

app.post("/auth/login", login);
app.post("/auth/register", register);

app.listen(getSection("development").port, () => {
  console.log(`Server started at port: ${getSection("development").port}`);
});
