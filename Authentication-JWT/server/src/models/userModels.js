import mongoose from "mongoose";
import validator from 'validator';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { config } from '../config/config.js';
import createHttpError from 'http-errors';

const secretKey = config.SecretKey;

const userSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 4,
        maxlength: 50,
        validate: {
            validator: function(value) {
              if (!validator.isAlpha(value.replace(/\s/g, ''))) { // Also consider removing white spaces
                throw new Error("Not a valid full name");
              }
            },
            message: props => `${props.value} is not a valid name!`
        },
        set: function(value) {
         return value.split(' ').map((word) => word.replace(/^./, word[0].toUpperCase())).join(' ')
        }
    },

    email: {
        type: String,
        required: true,
        unique: true, // Corrected typo
        validate: {
            validator: function(value) {
                if (!validator.isEmail(value)) {
                    throw new Error("Not a valid email");
                }
            },
            message: props => `${props.value} is not a valid email!`
        }
    },

    password: {
        type: String,
        reqquired: true,
        minlength: 7,
    },

    cpassword: {
        type: String,
        reqquired: true,
        minlength: 7,
    },

    tokens: [
        {
            token: {
                type: String,
                required: true,
            }
        }
    ],
    
    varifiedToken: {
         type: String
    }

},{timestamps: true});

// Hashing password.
userSchema.pre("save", function(next) {
    const hashPassword = async () => {
        try {
            // It means when we modified then modify otherwise not modify itself.
            if(this.isModified("password")) {
                // Hash the password and confirm password before saving
                this.password = await bcrypt.hash(this.password, 12);
                this.cpassword = await bcrypt.hash(this.cpassword, 12);
            }
            next();
        } catch (error) {
            next(error);
        }
    };

    // Call the asynchronous function
    hashPassword();
});

// generate token.
userSchema.methods.generateAuthtoken = async function () {
    try {
        let token123 = jwt.sign({_id:this._id}, secretKey, {expiresIn: "1d"});

        // This is models wala tokens.
        this.tokens = this.tokens.concat({token:token123});
        await this.save();
        return token123;
    } catch (error) {
        throw createHttpError(500, error.message);
    }
}

const userModel = mongoose.model("User", userSchema);

export default userModel;
