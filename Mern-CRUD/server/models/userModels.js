import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name: { 
        type: String, 
        required: true,
        trim: true, 
        minlength:5, 
        maxlength: 50,
        validate: {
            validator: (v) => {
                return /^[a-zA-Z ]+$/.test(v); 
            },
            message: props => `${props.value} contains non-alphabet characters!`
        },
        set: function(v) {
            return v.split(' ').map(word => word.replace(/^./, word[0].toUpperCase())).join(' ');
        }
    },
    email: { 
        type: String,
        required: true,
        unique: true,
        trim: true,
        match: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
        lowercase: true,
    },
    fees: { 
        type: mongoose.Schema.Types.Decimal128,
        required: true, 
        validate: {
            validator: (value) => {
                return value >= 1000;
            },
            message: "Fees must be at least ₹ 1000"
        }
    }
 }, { timestamps: true });
 
const UserModel = mongoose.model('UserModel', userSchema);

export default UserModel;