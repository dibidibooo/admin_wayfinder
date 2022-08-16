const multer = require("multer");
const path = require('path');

const imageFilter = (req, file, cb) => {
  if (file.mimetype.startsWith("image")) {
    cb(null, true);
  } else {
    cb("Please upload only images.", false);
  }
};

let uploadFolder = path.join('frontend', 'src', 'assets', 'uploads');

let storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadFolder);
  },
  filename: (req, file, cb) => {
    const mimeExtension = {
        'image/jpg': '.jpg',
        'image/jpeg': '.jpeg',
        'image/png': '.png',
        'image/gif': '.gif',
    }
    cb(null, file.originalname + mimeExtension(file.mimetype));
  },
});

let uploadFile = multer({ storage: storage, fileFilter: imageFilter });

module.exports = uploadFile;