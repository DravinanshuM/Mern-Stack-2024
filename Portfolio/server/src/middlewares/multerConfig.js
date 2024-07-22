import multer from "multer";

// step: 1. define disk storage.
const storage = multer.diskStorage({
  destination: async (req, file, cb) => {
    const uploadPath = "/tmp/my-uploads";
    cb(null, uploadPath);
  },
});

// stpe: 2. file validation.

// step: 3.  upload.
const uploads = multer({});
