const jwt = require('jsonwebtoken');
const config = require('config');
const session = require('express-session');



//next allows the program to move to the next middleware
module.exports = function(req, res, next){
    //get token from header
    const token = req.header('x-auth-token');
    //check if token exists
    if(!token){
        return res.status(401).json({msg:'no token, auth not allowed'})
    }

    try{
        //decodes the token
        const decoded = jwt.verify(token, config.get('jwtSecret'));
        req.user = decoded.user;
        next();

    } catch(err) {
        res.status(401).json({msg: 'token not valid'})
    }

}