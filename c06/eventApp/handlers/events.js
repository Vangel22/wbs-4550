const get = async (req, res) => {
  try {
  } catch (err) {
    console.log(err);
    return res.status(500).send("Invalid server error!");
  }
};

module.exports = {
  get,
};
