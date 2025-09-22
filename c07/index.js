const express = require("express");
const { expressjwt: jwt } = require("express-jwt");
const fileUpload = require("express-fileupload");

require("./pkg/db/config")();
const { getSection } = require("./pkg/config");
const { login, register } = require("./handlers/auth");

const app = express();
app.use(express.json());

app.use(
  jwt({
    secret: getSection("development").jwt_secret,
    algorithms: ["HS256"],
  }).unless({
    path: ["/auth/login", "/auth/register"],
  })
);

app.use(fileUpload());

app.post("/auth/login", login);
app.post("/auth/register", register);

// Storage
// app.post("/api/storage", upload);
// app.get("/api/storage/:filename", download);

// /uploads

app.listen(getSection("development").port, () => {
  console.log(`Server started at port ${getSection("development").port}`);
});
