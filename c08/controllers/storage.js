const fs = require("fs");
const makeId = require("../helper/strings");

// 8 bit -> 1 byte
// 1024 byte -> 1 KB
// 1024 KB -> 1 MB
// 1024 MB -> 1 GB

// 1024 * 1024 = 1 MB
// 10 * 1024 * 1024 = 10 MB

const MAX_FILESIZE = 10 * 1024 * 1024;
const ALLOWED_FILETYPES = ["image/jpeg", "image/jpg", "image/png"]; // mimetype

// upload

const upload = async (req, res) => {
  console.log("files", req.files);

  // Icloud.uploadFile(req.files)

  if (!req.files) {
    return res.status(400).send("No file was uploaded!");
  }

  // document ni e kluc koj go definirame vo POSTMAN
  if (MAX_FILESIZE < req.files.document.size) {
    return res.status(400).send("File exceeds max file size!");
  }

  if (!ALLOWED_FILETYPES.includes(req.files.document.mimetype)) {
    return res.status(400).send("File type not allowed!");
  }

  // Ime na folder i celosna pateka do nego
  const userDir = `user_${req.auth.id}`; // imeto na folderot koj ke se zacuva vo /uploads
  const userDirPath = `${__dirname}/../uploads/${userDir}`;

  if (!fs.existsSync(userDirPath)) {
    fs.mkdirSync(userDirPath);
  }

  // Fajl

  const newFileName = req.files.document.name.split("."); // slika.jpg
  // newFileName = ["slika", "jpg"];
  // newFileName[0] = "slika"
  // newFileName[1] = "jpg"
  const userFileName = newFileName[0];
  const userFileNameExtension = newFileName[1];

  const fileName = `${userFileName}_${makeId(6)}.${userFileNameExtension}`; // slika_1234.jpg

  const filePath = `${userDirPath}/${fileName}`; // /uploads/user_1234/slika_1234.jpg

  req.files.document.mv(filePath, (err) => {
    if (err) return res.status(500).send("Internal Server Error!");
    return res.status(200).send({ file_name: fileName });
  });
};

// download

const download = async (req, res) => {
  const userDir = `user_${req.auth.id}`;
  const userDirPath = `${__dirname}/../uploads/${userDir}`;

  const filePath = `${userDirPath}/${req.params.filename}`;

  if (!fs.existsSync(filePath)) {
    return res.status(400).send("File not found!");
  }

  res.download(filePath);
};

module.exports = {
  upload,
  download,
};
