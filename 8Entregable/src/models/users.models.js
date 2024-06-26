const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    first_name: {
        type: String, 
        required: true
    }, 
    last_name: {
        type: String, 
        required: true
    }, 
    age: {
        type: Number,
    },
    email: {
        type: String, 
        required: true,
        unique: true
    },
    password: {
        type: String, 
        required: true
    },
    rol: {
        type: String, 
        default: 'user'
    }
});

const UserModel = mongoose.model('users', userSchema);

module.exports = UserModel;