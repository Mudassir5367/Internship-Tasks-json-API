const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
require('../db/connection')
const jwt = require('jsonwebtoken')
const User = require('../model/userSchema');
const verifyToken = require('../middleware/jwtVerify');

router.post('/api/register',async(req, res)=>{
    // console.log(req.body);
    const {name, email, phone, password} = req.body;
    if(!name || !email || !phone || !password ){
        return res.json({error:'plz filled the field'})
        }
        try {
            
            const loginUser = await User.findOne({email:email})
            if(loginUser){
                return res.json({error:'user already exist'})
            }else{
                const user = new User({name, email, phone, password})
                // const newUser = new User({ name, email, phone, password });
                await user.save();
                console.log('user data added to the database');
                return res.json({ msg: 'User data added to the database' });
            }
        } catch (error) {
            console.error('Error during registration:', error);
            return res.status(500).json({ error: 'Internal Server Error' });
        }
})


////////// Login ///////////

router.post('/api/signin', async (req, res) => {
    const {email, password} = req.body;
    if(!email || !password ){
        return res.json({error:'plz filled the field'})
        }
        try {
            const loginUser = await User.findOne({email:email})
            // console.log(loginUser);
            if(loginUser){
                const isMatch = await bcrypt.compare(password, loginUser.password)
                if(isMatch){
                const token = await loginUser.generateAuthToken();
                console.log('Generated Token:', token);
                    console.log('signin successful');
                    return res.json({ token: token, loginUser: loginUser });
                }else{
                    return res.json({error:'wrong password'})
                }
            }
           
        } catch (error) {
            console.error('Error during signin:', error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
})


// Apply verifyToken middleware to routes that require authentication
router.get('/api/protected', verifyToken, async(req, res) => {
    // Access authenticated user via req.user
    res.json({ message: 'Protected route', user: req.user });
  });

module.exports = router;