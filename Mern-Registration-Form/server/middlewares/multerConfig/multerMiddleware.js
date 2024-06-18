import multer from "multer";

//  step: 1. set file destiny and file name
const storage = multer.diskStorage({
    destination: function (req, file, callback) {
        callback(null, './public/uploads');
    },
    filename: function (req, file, callback) {
        const randomName = Math.floor(10 + Math.random() * 90); // Generate 2-digit random number
        const timestamp = Date.now().toString().slice(-2); // Get last 2 digits of current timestamp
        const randomChars = Math.random().toString(36).substring(2, 6).toUpperCase(); // Generate 4 random characters
        const extension = file.originalname.split('.').pop(); // Extract file extension
        const filename = `${randomChars}-${randomName}${timestamp}.${extension}`; // Combine random name, timestamp, random characters, and extension
        callback(null, filename);
    },    
});

// step: 2. filter (validations criteria)
const fileFilter = function(req, file, callback) {
    // only get these extension type images.
    const allowedMimes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif'];

    if(allowedMimes.includes(file.mimetype)) {
        callback(null, true);
    } else {
        callback(new Error('Invalid file type. Only .png, .jpg, .jpeg, or .gif files are allowed.'));
    }
}

// step: 3. last One. upload.
const upload = multer({
    storage: storage,
    limits: {
        fileSize: 5 * 1024 * 1024 // Limiting file size to 5MB
    },
    fileFilter: fileFilter
});

export default upload;