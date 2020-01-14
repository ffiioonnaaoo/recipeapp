const mongoose = require('mongoose');


const ProfileSchema = new mongoose.Schema({
user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user'
},
favouriteRecipes: {
    type: [String]
},
dietReqs: {
    type: [String]
},
bio: {
    type: String
}, 
social: {
    youtube: {
        type: String
    },
    instagram: {
        type: String
    },
    twitter: {
        type: String
    }
}

})

module.exports = Profile = mongoose.model('profile', ProfileSchema)