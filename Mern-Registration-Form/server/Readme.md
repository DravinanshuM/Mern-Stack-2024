# packges for API creation.
1. npm i cors.
2. npm i express.
3. npm i mongoose.
4. npm i dotenv.
5. npm i -D nodemon.
6. npm i multer
7. npm i fast-csv



```JavaScript
## update.

updateUser: async (req, res) => {
        const { firstName, lastName, email, mobile, gender, status, address } = req.body;
        const file = req.file ? req.file.filename : null;
        const userId = req.params.id;
    
        console.log("User Id:", userId);
        console.log("File Name:", file);
    
        const sourcePath = path.join(filePath, file);
        const destinationPath = path.join(filePath, '../public/uploads', file);
    
        console.log("Source Path:", sourcePath);
        console.log("Destination Path:", destinationPath);
    
        try {
            if (!mongoose.Types.ObjectId.isValid(userId)) {
                // Invalid userId
                if (file) {
                    // Delete the file if it exists
                    fs.unlinkSync(destinationPath);
                }
                return res.status(400).json({ message: "Invalid userId" });
            }
    
            // Find the user by ID
            const user = await User.findById(userId);
            if (!user) {
                // User not found
                if (file) {
                    // Delete the file if it exists
                    fs.unlinkSync(destinationPath);
                }
                return res.status(404).json({ message: "User not found" });
            }
    
            // Check if email is already taken
            const emailExists = await User.findOne({ email: email, _id: { $ne: userId } }); // The $ne operator stands for "not equal".
            if (emailExists) {
                if (file) {
                    fs.unlinkSync(destinationPath);
                }
                return res.status(400).json({ message: "This email is already taken by another user" });
            }
    
            // Check if mobile number is already taken
            const mobileNumberExists = await User.findOne({ mobile: mobile, _id: { $ne: userId } });
            if (mobileNumberExists) {
                if (file) {
                    fs.unlinkSync(destinationPath);
                }
                return res.status(400).json({ message: "This mobile number is already taken by another user" });
            }
    
            // Delete old profile picture if updating the profile picture.
            if (file && user.profile) {
                const oldProfilePath = path.join(filePath, '../public/uploads', user.profile);
                if (fs.existsSync(oldProfilePath)) {
                    fs.unlinkSync(oldProfilePath);
                }
            }
    
            // Update user
            const updatedUser = await User.findByIdAndUpdate(userId, {
                firstName,
                lastName,
                email,
                mobile,
                gender,
                status,
                profile: file || user.profile,
                address,
            }, { new: true });
    
            res.status(200).json(updatedUser);
        } catch (error) {
            console.error("Error:", error);
            res.status(500).json({ message: "Internal Server Error" });
        }
    }
```