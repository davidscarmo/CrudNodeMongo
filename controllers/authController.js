const express = require('express'); 
const bcrypt = require('bcryptjs'); 
const jwt = require('jsonwebtoken'); 

const authConfig = require('../config/auth.json');

const User = require('../models/User'); 

const router = express.Router(); 
const generateToken =  (params = {}) =>
{
    return jwt.sign(params, authConfig.secret, 
        {
          expiresIn: 86400, //time to expire in minutes. 86400 = 1 day  
        } ); 
}; 

router.post('/register', async (req, res) => 
{
    const {email} = req.body; 
    try 
    {
        if( await User.findOne({email}))
        {
            return res.status(400).send({error: 'User already exists'});   
        }
        const user = await User.create(req.body);

        user.password = undefined;

        return res.send({user, token: generateToken({id: user.id})}); 

    }
    catch(err)
    {
       
        return res.status(400).send({error: 'Registration Failed'}); 
    }
}); 

router.post('/authenticate', async(req, res) => 
{
    const { email, password} = req.body; 
 
    const user = await User.findOne({email}).select('+password'); // password was "select = false" 
    if(!user)
        return res.status(400).send({ error: 'User not found'});

    if(!await bcrypt.compare(password, user.password))
        return res.status(400).send({error: 'Invalid password'}); 
    
    // remove password 
    user.password = undefined; 

  
    res.send(
        {user, 
        token: generateToken({id: user.id})
        }); 
})

module.exports = app => app.use('/auth', router);