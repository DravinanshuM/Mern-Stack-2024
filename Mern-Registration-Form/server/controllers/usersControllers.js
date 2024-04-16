import User from "../models/userModels.js";
import mongoose from "mongoose";
import path from 'path';
import { fileURLToPath } from "url";
import * as fs from 'node:fs';
import * as csv from 'fast-csv';

const fileName = fileURLToPath(import.meta.url);
const filePath = path.dirname(fileName);

const userControllers = {

    // for get All Document.
    getAllUsers: async (req, res) => {
        const search = req.query.search || "";
        const gender = req.query.gender || ""; 
        const status = req.query.status || "";
        const sort = req.query.sort || "";

        // Pagination. 
        const page = req.query.page || 1;
        const ITEM_PER_PAGE = 4;
    
        const query = {
            firstName: { $regex: search, $options: "i" },
        }
    
        if (gender !== "All") {
            query.gender = gender; // Corrected to filter by specific gender
        }

        if(status !== "All") {
            query.status = status;
        }
    
        try {
            const skip = (page - 1) * ITEM_PER_PAGE;
            const count = await User.countDocuments(query);
            // console.log(count);

            const users = await User.find(query).sort({ createdAt: sort === "new" ? -1 : 1 }).limit(ITEM_PER_PAGE).skip(skip);
    
            // If No Data is available.
            if (users.length === 0) {
                return res.status(404).json({ message: "No Data Available" });
            }

            const pageCount = Math.ceil(count/ITEM_PER_PAGE);
    
            res.status(200).json({
                pagination: {
                    count,
                    pageCount
                },
                users
            });
            
        } catch (error) {
            res.status(500).json({ error: error });
        }
    },
    
    // For get Specific Document based on Id.
    getOneUsers: async (req, res) => {
        try {
            const userId = req.params.id;
            console.log(userId);

            if(!mongoose.Types.ObjectId.isValid(userId)) {
                return res.status(400).json({ message: "Invalid user Id" });
            }

            const result =await User.findById(userId);

            // If Document Not Found.
            if(!result) {
                return res.status(404).json({ message: "Document Not Found" });
            }

            res.status(200).json(result);
        } catch (error) {
            res.status(500).json({ error: error });
        }
    },

    // For Creating user Document.
    createUsers: async (req, res) => {
        try {
            const { firstName, lastName, email, mobile, gender, status, address } = req.body;
            const file = req.file;
    
            // Validation
            if (!firstName || !lastName || !email || !mobile || !gender || !status || !address || !file) {
                return res.status(400).json({ message: "All fields are required" });
            }
    
            // Check if email already exists
            const existingEmail = await User.findOne({ email: email });
            if (existingEmail) {
                return res.status(400).json({ message: "This email Id is already registered" });
            }
    
            // check mobile already exists.
            const existingMobile = await User.findOne({ mobile: mobile });
            if (existingMobile) {
                return res.status(400).json({ message: "This mobile number is already registered" });
            }
    
            // Assuming file is uploaded.
            const profile = file.filename;
    
            // Create new user
            const user = new User({
                firstName: firstName,
                lastName: lastName,
                email: email,
                mobile: mobile,
                gender: gender,
                status: status,
                profile: profile,
                address: address,
            });
    
            // Save user to database
            const result = await user.save();
            
            // Move the file upload logic here, after successful validation and database operation
            // Move the file to the desired location
            const destination = path.join(filePath, '../public/uploads', file.filename);
            fs.rename(file.path, destination, (err) => {
                if (err) {
                    console.error("Error moving file:", err);
                    return res.status(500).json({ message: "Error uploading file", error: err });
                }
                res.status(201).json(result);
            });
        } catch (error) {
            // Handle errors
            console.error("Error creating user:", error);
            if (error.name === "ValidationError") {
                return res.status(400).json({ error: "Validation Error", details: error.errors });
            }
            res.status(500).json({ error: error });
        }
    },
    
    // For Delete User Document.
    deleteUser: async (req, res) => {
        try {
            const userId = req.params.id;
    
            if (!mongoose.Types.ObjectId.isValid(userId)) {
                return res.status(400).json({ message: "Invalid UserId" });
            }
    
            const user = await User.findById(userId);
    
            if (!user) {
                return res.status(404).json({ message: "Document Not Found" });
            }
    
            // const filePath = path.join(filePath, '../public/uploads', user.profile);
            const filePath = path.join(path.dirname(fileName), '../public/uploads', user.profile);
            // console.log(filePath);
    
            // Delete the file first
            fs.unlink(filePath, async (err) => {
                if (err) {
                    return res.status(500).json({ message: "Error deleting file" });
                }
                
                // Delete user document from database
                try {
                    const result = await User.findByIdAndDelete(userId);
                    res.status(200).json(result);
                } catch (error) {
                    res.status(500).json({ message: "Error deleting user document", error: error });
                }
            });
    
        } catch (error) {
            res.status(500).json({ message: "Internal Server Error", error: error.message });
        }
    },

    // For Update API.
    updateUser: async (req, res) => {
        const { firstName, lastName, email, mobile, gender, status, address } = req.body;
        const file = req.file ? req.file.filename : null;
        const userId = req.params.id;

        const destinationPath = file ? path.join(filePath, '../public/uploads', file) : null;

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
            const emailExists = await User.findOne({ email: email, _id: { $ne: userId } });
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
            if (destinationPath && fs.existsSync(destinationPath)) {
                fs.unlinkSync(destinationPath); // Remove the uploaded file if an error occurs
            }
            res.status(500).json({ message: "Internal Server Error" });
        }
    },

    // For Status.
    statusUpdate: async (req, res) => {
        const { id } = req.params;
        const status = req.body;
        try {
          const result = await User.updateOne({ _id: id }, { $set: status }); // Use $set to update only the fields provided in the status object
          res.status(200).json(result);
        } catch (error) {
          res.status(400).json({ error: error.message }); // Access the error message property for a more informative error response
        }
    },

    // For Export CSV file.
    userExport: async (req, res) => {  
        try {
            const csvStream = csv.format({ headers: true });  
            const users = await User.find();
    
            // Ensure directory structure exists
            if(!fs.existsSync("public/files/export")) {
                if(!fs.existsSync("public/files")) {
                    fs.mkdir("public/files", { recursive: true });
                }

                if(!fs.existsSync("public/files/export")) {
                    fs.mkdir("public/files/export", { recursive: true })
                }
            }
    
            // Create writable stream
            const writablestream = fs.createWriteStream("public/files/export/users.csv");
        
            csvStream.pipe(writablestream);
    
            // Write user data to CSV stream
            if (users && users.length > 0) {
                users.forEach((user) => {
                    csvStream.write({
                        FirstName: user.firstName || "-",
                        LastName: user.lastName || "-",
                        Email: user.email || "-",
                        Mobile: user.mobile || "-",
                        Gender: user.gender || "-",
                        Status: user.status || "-",
                        Profile: user.profile || "-",
                        Address: user.address || "-",
                        CreatedAt: user.createdAt || "-",
                        UpdatedAt: user.updatedAt || "-"
                    });
                });
            }
    
            csvStream.end();
            writablestream.on("finish", function () {
                res.json({
                    downloadUrl: `http://localhost:8000/files/export/users.csv`,
                });
            });
        } catch (error) {
            console.error("Error exporting CSV:", error);
            res.status(500).json({ error: "Internal Server Error" });
        }
    }
    
}

export default userControllers;