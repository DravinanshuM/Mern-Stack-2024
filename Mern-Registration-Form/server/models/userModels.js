import mongoose from 'mongoose';

const userSchema = mongoose.Schema({
    firstName: {
        type: String,
        required: true,
        trim: true,
        minlength: 2,
        maxlength: 20,
        validate: {
            validator: (v) => {
                return /^[a-zA-ZÀ-ÿ\u00C0-\u00FF '-]+$/.test(v);
            },
            message: props => `${props.value} contains invalid characters!`
        },
        set: function(v) {
            return v.split(' ').map(value=> value.replace(/^./, value[0].toUpperCase())).join(' ');
        }
    },

    lastName: {
        type: String,
        required: true,
        trim: true,
        minlength: 2,
        maxlength: 20,
        validate: {
            validator: (v) => {
                return /^[a-zA-ZÀ-ÿ\u00C0-\u00FF '-]+$/.test(v);
            },
            message: props => `${props.value} contains invalid characters!`
        },
        set: function(v) {
            return v.split(' ').map(value=> value.replace(/^./, value[0].toUpperCase())).join(' ');
        }
    },

    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true,
        validate: {
            validator: function(v) {
                return /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/.test(v);
            },
            message: props => `${props.value} email is not valid`
        }
    },

    mobile: {
        type: String,
        unique: true,
        minlength: 10,
        maxlength: 10,
        validate: {
            validator: function(v) {
                return /^\d{10}$/.test(v);
            },
            message: props => `${props.value} is not a valid mobile number`
        }
    },

    gender: {
        type: String,
        enum: ['M', 'F'],
        required: true,
    },

    status: {
        type: String,
        enum: ['Active', 'Inactive'],
        required: true,
    },

    profile: {
        type: String,
        required: true,
    },

    address: {
        type: String,
        required: true,
    }
}, { timestamps: true });

const User = mongoose.model('User', userSchema);

export default User;
