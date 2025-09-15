const {
  getAllByUser,
  getSingle,
  create,
  update,
  remove,
} = require("../pkg/blog");
const { validateSchema } = require("../helper/validation");
const { BlogCreate, BlogUpdate } = require("../pkg/blog/validate");

const getAllPosts = async (req, res) => {
  try {
    const userPosts = await getAllByUser(req.auth.id);
    return res.status(200).send(userPosts);
  } catch (err) {
    return res.status(500).send("Invalid server error!");
  }
};

const createPost = async (req, res) => {
  try {
    // Toj sto ja povikuva rutata mora da bide avtenticiran
    // i da ima token payload vo req.auth

    //req.body -> title, content
    const data = {
      ...req.body,
      createdBy: req.auth.id,
    };

    await validateSchema(data, BlogCreate);

    const newPost = await create(data);
    return res.status(200).send(newPost);
  } catch (err) {
    return res.status(500).send("Invalid server error!");
  }
};

const updatePost = async (req, res) => {
  try {
    await validateSchema(req.body, BlogUpdate);

    const checkPost = await getSingle(req.params.id);

    if (!checkPost) {
      return res.status(404).send("Post not found!");
    }

    if (checkPost.createdBy.toString() !== req.auth.id.toString()) {
      return res.status(400).send("User is not owner of this post!");
    }

    const updatedPost = await update(req.params.id, req.body);

    return res.status(200).send(updatedPost);
  } catch (err) {
    return res.status(500).send("Invalid server error!");
  }
};

const removePost = async (req, res) => {
  try {
    const checkPost = await getSingle(req.params.id);

    if (!checkPost) {
      return res.status(404).send("Post not found!");
    }

    if (checkPost.createdBy.toString() !== req.auth.id.toString()) {
      return res.status(400).send("User is not owner of this post!");
    }

    const removedPost = await remove(req.params.id);

    return res.status(200).send(removedPost);
  } catch (err) {
    return res.status(500).send("Invalid server error!");
  }
};

module.exports = {
  getAllPosts,
  createPost,
  updatePost,
  removePost,
};
