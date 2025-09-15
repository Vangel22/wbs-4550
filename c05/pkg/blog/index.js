const mongoose = require("mongoose");

const postSchema = mongoose.Schema({
  title: String,
  content: String,
  createdBy: {
    immutable: true,
    type: mongoose.SchemaTypes.ObjectId,
    ref: "Account",
  },
});

const PostModel = mongoose.model("Post", postSchema, "posts");

// Pronajdi gi site postovi za odreden korisnik koj gi napravil
const getAllByUser = async (createdBy) => {
  return await PostModel.find({ createdBy });
};

// Proverkata ke bide vo handlerot
const getSingle = async (_id) => {
  return await PostModel.findOne({ _id });
};

// ke vnimavame vo handlerot
const create = async (data) => {
  const newPost = new PostModel(data);
  return await newPost.save();
};

// ke vnimavame vo handlerot
const update = async (_id, data) => {
  return await PostModel.updateOne({ _id }, data);
  // return await PostModel.updateOne({ createdBy, _id }, data);
};

// ke vnimavame vo handlerot
const remove = async (_id) => {
  return await PostModel.deleteOne({ _id });
};

module.exports = {
  getAllByUser,
  getSingle,
  create,
  update,
  remove,
};
