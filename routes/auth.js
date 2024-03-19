const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
require('../db/connection')
const jwt = require('jsonwebtoken')
const User = require('../model/userSchema')
// const authentication = require('../middleware/authentication')

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
                const token = await user.generateAuthToken();
                console.log('Generated Token:', token);
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
            if(loginUser){
                const isMatch = await bcrypt.compare(password, loginUser.password)
                if(isMatch){
                    console.log('signin successful');
                    return res.json(loginUser)
                }else{
                    return res.json({error:'wrong password'})
                }
            }
           
        } catch (error) {
            console.error('Error during signin:', error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
})

module.exports = router;