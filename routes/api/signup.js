const express = require('express');
const router = express.Router();
const {check, validationResult} =  require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');


const User = require('../../models/User');


//test, public route
router.post('/',[
    check('email', 'Please include an email').not().isEmpty(),
    check('email', 'Please include a valid email').not().isEmpty().isEmail(),
    check('firstName', 'firstName').not().isEmpty(),
    check('password', 'Enter a password with at least 6 characters').isLength({min: 6})
],
async (req, res) => {
    const {firstName, lastName, email, password, password2 } = req.body
    const errors = validationResult(req);

    //validating form post data
    if(!errors.isEmpty()){
        return res.status(400).json({errors:errors.array()})
    }
   
    if(!firstName){return res.json({msg: 'A first name is required'})}
    if(!lastName){ return res.json({msg: 'A last name is required'})}
    if(!email){ return res.json({msg: 'An email address is required'})}
    if(!password){ return res.json({msg: 'A password is required'})}
    if(password.length < 7 ){ return res.json({msg: 'A valid password is required'})}
    if(password !== password2){ return res.json({msg: 'Passwords must match'})}

    try{
    //check if user exists
    let user = await User.findOne({ email })
    if(user){
        return res.status(400).json({msg:"user already exists"})
    }
//create a new instance a of user
user = new User ({
    firstName,
    lastName,
    email,
    password
})
    //encrypt password
const salt = await bcrypt.genSalt(10);

user.password = await bcrypt.hash(password, salt);
await user.save();
 //return res.json({msg:"SUCCESS user has been signed up"});

//create json web token
const payload = {
    user: {
        id: user
    }
}

jwt.sign(payload, 
    config.get('jwtSecret'), 
    {
    expiresIn: 3600
}, 
(err, token)=> {
    if(err) throw err;
    res.send({ token })
    console.log(token)
});

}catch(err) {
        console.log(err.message);
        res.status(500).send('server error')
    }
    
   
});




module.exports = router;