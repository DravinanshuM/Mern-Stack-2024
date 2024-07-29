import multer from "multer";
import path from "path";
import fs from "fs/promises";

// Ensure upload directory exists
const ensureUploadDirExists = async (uploadPath) => {
  try {
    await fs.access(uploadPath);
  } catch (error) {
    await fs.mkdir(uploadPath, { recursive: true });
  }
};

// Define disk storage
const storage = multer.diskStorage({
  destination: async (req, file, cb) => {
    const uploadPath = path.resolve(__dirname, "./../public/temp/uploads");
    try {
      await ensureUploadDirExists(uploadPath);
      cb(null, uploadPath);
    } catch (error) {
      cb(error);
    }
  },

  filename: (req, file, callback) => {
    const randomDigits = Math.floor(Math.random() * 1000); // 3 random digits
    const timeStamp = Date.now().toString().slice(-4); // Last 4 digits of timestamp
    const randomChars = Math.random()
      .toString(36)
      .substring(2, 6)
      .toUpperCase(); // 4 random characters
    const extension = path.extname(file.originalname); // File extension

    // Construct the filename
    const filename = `${randomChars}-${randomDigits}${timeStamp}${extension}`;
    callback(null, filename);
  },
});

// File filter
const fileFilter = (req, file, callback) => {
  const allowedMimes = ["image/jpeg", "image/jpg", "image/png"];

  if (allowedMimes.includes(file.mimetype)) {
    callback(null, true);
  } else {
    callback(
      new Error("Invalid file type. Only .png, .jpg, .jpeg files are allowed.")
    );
  }
};

// Upload configuration
const uploads = multer({
  storage: storage,
  limits: {
    fileSize: 10 * 1024 * 1024, // 10MB
  },
  fileFilter: fileFilter,
});

export default uploads;
