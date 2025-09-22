// za da generirame ID za fajl

const makeId = (length) => {
  let result = "";

  if (length < 1) {
    return;
  }

  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * characters.length));
    // "1"+"a" = "1a"
  }

  return result;
};

module.exports = makeId;

// makeId(6) -> abc123
// makeId(3) -> 3a3
