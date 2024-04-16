import UserModel from '../models/userModels.js';
import mongoose from 'mongoose';

class UserControllers {
    // For Creating Document.
    // static createDoc = async (req, res) => {
    //     try {
    //         const { name, email, fees } = req.body;
    //         console.log("Received data:", { name, email, fees });
    
    //         if (!name || typeof name !== 'string' || !email || typeof email !== 'string' || !fees || typeof fees !== 'number') {
    //             return res.status(400).json({ message: 'Invalid input data or Missing Fields' });
    //         }
            
    //         const result = new UserModel({ name: name, email: email, fees: fees });
    //         console.log("result", result);
    //         const data = await result.save();
    //         console.log("Saved data:", data);   
    
    //         res.status(201).send(data);
    //     } catch (error) {
            // if (error.name === "ValidationError") {
            //     return res.status(400).json({ error: "Validation Error", details: error.errors });
            // }
            // res.status(500).json({ error: error.message });
    //     }
    // }

    static createDoc = async(req, res) => {
        try {
            const { name, email, fees } = req.body; 

            // first name is model key and second is req.body key.
            const doc = new UserModel({
                name: name,
                email: email,
                fees: fees
            })

            const result = await doc.save();
            res.status(201).send(result);

        } catch (error) {
            if (error.name === "ValidationError") {
                return res.status(400).json({ error: "Validation Error", details: error.errors });
            }
            res.status(500).json({ error: error });
        }
    }
    
    // Fpr Get All Document.
    static getAllDoc = async (req, res) => {
        try {
            const result = await UserModel.find();

            if (result.length === 0) {
                return res.status(404).json({ message: 'No data available' });
            }
            
            res.status(200).send(result);
        } catch (error) {
            res.status(500).json({ error: "Internal Server Error" });
        }
    }

    // For Get One Document.
    static getOneDoc = async (req, res) => {
        try {
            const userId = req.params.id;

            if (!mongoose.Types.ObjectId.isValid(userId)) {
                return res.status(400).json({ message: 'Invalid User Id' });
            }

            const result = await UserModel.findById(userId);

            if (!result) {
                return res.status(404).json({ message: 'Document not found' });
            }

            res.send(result);
        } catch (error) {
            res.status(500).json({ error: 'Internal Server Error' });
        }
    }

    // For Delete One Document.
    static deleteDoc = async (req, res) => {
        try {
            const userId = req.params.id;

            if (!mongoose.Types.ObjectId.isValid(userId)) {
                return res.status(400).json({ message: 'Invalid User Id' });
            }

            const result = await UserModel.findByIdAndDelete(userId);

            if (!result) {
                return res.status(404).json({ message: 'User not found' });
            }

            res.status(200).json({ message: "Data is deleted" });
        } catch (error) {
            res.status(500).json({ error: 'Internal Server Error' });
        }
    }

    // For Update the One Document.
    static updateDoc = async (req, res) => {
        try {
            const userId = req.params.id;
            
            // 1. Check if userId is Invalid.
            if(!mongoose.Types.ObjectId.isValid(userId)) {
                return res.status(400).json({ message: "Invalid User Id" });
            }
            
            const result = await UserModel.findByIdAndUpdate(userId, req.body, { new: true });

            if(!result) {
                return res.status(404).json({ message: "Document not found" });
            }
            res.status(200).send(result);

        } catch (error) {
            res.status(500).json({ error: error.message});
        }
    }

    // For Pagination Code.
    static paginationDoc = async (req, res) => {
        try {
            const page = parseInt(req.query.page) || 1;
            const limit = parseInt(req.query.limit) || 5;
            const skip = (page - 1) * limit;
    
            const [result, totalCount] = await Promise.all([
                UserModel.find().skip(skip).limit(limit),
                UserModel.countDocuments()
            ]);
            const totalPages = Math.ceil(totalCount / limit);
    
            res.status(200).json({
                totalDocuments: totalCount,
                totalPages: totalPages,
                currentPage: page,
                result
            });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
    
}

export default UserControllers;
