const multer = require("multer");
const path = require("path");

// Set the storage engine for multer
const storage = multer.diskStorage({
  destination: "C:/Users/Hp/Desktop/data/Builds/real/SMS-BACKEND-NODE/uploads/", // Destination folder to save the uploaded files
  filename: (req, file, cb) => {
    cb(
      null,
      file.fieldname + "-" + Date.now() + path.extname(file.originalname)
    );
  },
});

// Initialize multer with the storage options
const upload = multer({
  storage: storage,
});

module.exports = upload;
