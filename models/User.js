const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    firstName:{
        type: String,
        required: true
    }, 
    lastName: {
        type: String,
        required: true
    }, 
    email: {
        type: String,
        required: true,
        unique: true
    },
    favouriteRecipes: {
        type: [String]
    },
    password: {
        type:String,
        required: true
    },
    dateJoined: {
        type:Date,
        default:Date.now()
    }
    
})

module.exports = User = mongoose.model('user', UserSchema);