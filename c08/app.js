const express = require("express");
const { expressjwt: jwt } = require("express-jwt");
const fileUpload = require("express-fileupload");
require("dotenv").config();

require("./pkg/db/config")();
const { getSection } = require("./pkg/config");
const { login, register, resetPassword } = require("./controllers/auth");
const { upload, download } = require("./controllers/storage");
const {
  getAllPosts,
  createPost,
  updatePost,
  removePost,
} = require("./controllers/posts");

const app = express();
app.use(express.json());

app.use(
  jwt({
    secret: getSection("development").jwt_secret,
    algorithms: ["HS256"],
  }).unless({
    path: ["/auth/login", "/auth/register", "/auth/reset"],
  })
);

app.use(fileUpload());

// Auth
app.post("/auth/login", login);
app.post("/auth/register", register);
app.post("/auth/reset", resetPassword);

// Storage
app.post("/api/storage", upload);
app.get("/api/storage/:filename", download);

// Posts
app.get("/posts", getAllPosts);
app.post("/posts", createPost);
app.put("/posts/:id", updatePost);
app.delete("/posts/:id", removePost);

// Recipes

app.listen(process.env.port, () => {
  console.log(`Server started at port ${process.env.port}`);
});
