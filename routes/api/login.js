const express = require('express');
const router = express.Router();
const {check, validationResult} =  require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');
const auth = require('../../middleware/auth');


const User = require('../../models/User');


//test, public route
router.post('/', [
    check('email', 'Please include a valid email').not().isEmpty().isEmail(),
    check('password', 'Enter a password with at least 6 characters').isLength({min: 6})
],
async (req, res) => {
    const { email, password } = req.body
    const errors = validationResult(req);

    //validating form post data
    if(!errors.isEmpty()){
        return res.status(400).json({errors:errors.array()})
    }

    if(!email){res.json({msg: 'An email address is required'})}
    if(!password){res.json({msg: 'A password is required'})}


    try{
    //check if user exists
    let user = await User.findOne({ email })
    if(!user){
        return res.status(400).json({msg:"No user with that email"})
    }
//create a new instance a of user

    //encrypt password
const salt = await bcrypt.genSalt(10);

const isMatch = await bcrypt.compare(password, user.password);
if(!isMatch) {
    return res.status(400).json({errors:{ msg:'Invalid email or password'}})
} 



const payload = {
    user: {
        id: user.id
    }
}

jwt.sign(payload, 
    config.get('jwtSecret'), 
    {
    expiresIn: 36000
}, 
(err, token)=> {
    if(err) throw err;
    const decoded = jwt.verify(token, config.get('jwtSecret'));
    req.user = decoded.user;
    //res.send(req.user)
    return res.send({ token, id:user.id })
    
});


}catch(err) {
        console.log(err.message);
        res.status(500).send('server error')
    }
 
   
});

//get logged in user
router.get('/auth', auth,  async (req, res) => {
    try{
        //-password so we dont return the password
        const user = await User.findById(req.user.id).select('-password');
        res.send(user)

    }catch(error){
        console.log(err.message);
        res.status(500).send('Sender error');
    }
})

module.exports = router;