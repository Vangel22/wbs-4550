const fs = require("fs");

const read = (fileName) => {
  return new Promise((resolve, reject) => {
    fs.readFile(fileName, "utf-8", (err, data) => {
      if (err) reject(err);
      data = JSON.parse(data);
      resolve(data);
    });
  });
};

const write = (fileName, data) => {
  return new Promise((resolve, reject) => {
    data = JSON.stringify(data);

    fs.writeFile(fileName, data, (err) => {
      if (err) reject(err);
      resolve();
    });
  });
};

module.exports = {
  read,
  write,
};
