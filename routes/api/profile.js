const express= require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const Profile = require('../../models/Profile');
const User = require('../../models/User');

//show user profile - private
//get logged in user
router.get('/user', auth,  async (req, res) => {
    try{
        //-password so we dont return the password
        const user = await User.findById(req.user.id).select('-password');
        if(!user){
            res.send('no user with this id')
        }
        res.send(user)

    }catch(error){
        console.log(err.message);
        res.status(500).send('Sender error');
    }
});


router.post('/save-recipe', auth, async (req, res) => {
    try{
      
      let user = await User.findById(req.user.id).select('-password');
      console.log(user)

       if(!user){res.send('no user with this id')}

          const favouriteRecipes = req.body;
          console.log(favouriteRecipes)
          const userFields = {};
        userFields.user = req.user.id;
          console.log(userFields.user)

           if(!userFields) {userFields.favouriteRecipes = favouriteRecipes};
           console.log(userFields.favouriteRecipes)





    user = await User.findOneAndUpdate(
        //check user, set new data
        { user: req.user.id },
        { $push: {favouriteRecipes:favouriteRecipes }},
        done
        );
        console.log(user)


    }catch(error){
        console.log(error.message);
        res.status(500).send('Sender error');
    }

});

// //create or update profile
// router.post('/', auth, async (req, res) => {
//   //res.send('hellooo')

//   const {
//     favouriteRecipes,
//     dietReqs,
//     bio,
//     social,
//     youtube,
//     instagram,
//     twitter
// } = req.body;

// //make profile obj
// const profileFields = {};

// profileFields.user = req.user.id;
// if(bio) {profileFields.bio = bio};
// console.log(profileFields.bio)
// console.log('123')
// if(dietReqs) {
//     profileFields. dietReqs = dietReqs.split(',').map(  dietReq =>  dietReq.trim())};
// console.log(profileFields.dietReqs);

// //social object 
// profileFields.social = {}

// if(youtube){profileFields.social.youtube = youtube}
// if(twitter){profileFields.social.twitter = twitter}
// if(instagram){profileFields.social.instagram = instagram}
// //res.send('heeleleo');

// try{
// let profile = await Profile.findOne({ user: req.user.id});


// //Update
// if(profile) {
//     profile = await Profile.findOneAndUpdate(
//         //check user, set new data
//         { user: req.user.id },
//         { $set: profileFields },
//         { new: true}
//         );
//         console.log(profile)
//         return res.json(profile);
    
// }

// //Create
// profile = new Profile(profileFields);
// await profile.save();
// res.json(profile);
// }catch(error){
//     console.log(error.message)
//     res.status(500).send('server error')
// }


// })


//save recipe to profile
router.post('/', auth, async (req, res) => {
  //res.send('hellooo')

  const {
    favouriteRecipes,
    dietReqs,
    bio,
    social,
    youtube,
    instagram,
    twitter
} = req.body;

//make profile obj
const profileFields = {};

profileFields.user = req.user.id;
if(bio) {profileFields.bio = bio};
console.log(profileFields.bio)
console.log('123')
if(dietReqs) {
    profileFields. dietReqs = dietReqs.split(',').map(  dietReq =>  dietReq.trim())};
console.log(profileFields.dietReqs);

//social object 
profileFields.social = {}

if(youtube){profileFields.social.youtube = youtube}
if(twitter){profileFields.social.twitter = twitter}
if(instagram){profileFields.social.instagram = instagram}
//res.send('heeleleo');

try{
let profile = await Profile.findOne({ user: req.user.id});


//Update
if(profile) {
    profile = await Profile.findOneAndUpdate(
        //check user, set new data
        { user: req.user.id },
        { $set: profileFields },
        { new: true}
        );
        console.log(profile)
        return res.json(profile);
    
}

//Create
profile = new Profile(profileFields);
await profile.save();
res.json(profile);
}catch(error){
    console.log(error.message)
    res.status(500).send('server error')
}


})

module.exports = router;