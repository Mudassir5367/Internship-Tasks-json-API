const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
require('../db/connection')
const jwt = require('jsonwebtoken')
const {User} = require('../model/userSchema');
const {Posts} = require('../model/userSchema');
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





  // Route to save data Posts
  router.post('/api/post', async (req, res) => {
    try {
        for (let post of req.body) {
            const data = await Posts.findOne({ id: post.id });
            if (data) {
                return res.status(400).json({ error: 'Data already in DB' });
            } else {
                const newPost = new Posts(post);
                await newPost.save();
            }
        }
        res.status(200).json({ message: 'Data saved successfully' });
    } catch (error) {
        console.log('Data not saved', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});


router.get('/api/posts', async (req, res) => {
    try {
        // Fetch all posts from the database
        const posts = await Posts.find().sort({ time:-1});
        res.status(200).json(posts);
    } catch (error) {
        console.log('Error fetching posts', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// single card or id details get
router.get('/api/post/:id', async (req, res) => {
    try {
        const postId = req.params.id;
        const post = await Posts.findOne({ id: postId });
        if (!post) {
            return res.status(404).json({ error: 'Post not found' });
        }
        res.status(200).json(post);
    } catch (error) {
        console.log('Error fetching post details:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// custom post by login user

// router.post('/api/customPost', async (req, res)=>{
//     try {
//         const {userId, id, title, body} = req.body;
//         const data = await Posts.findOne({ id:id });
//         if(data){
//             console.log('Post with the same ID already exists');
//             return res.json({msg:'Post with the same ID already exists'})
//         }else{
//             const newPost = new Posts({
//                 userId,
//                 title,
//                 id,
//                 body,
//                 isCustom: true,
//                 // users,
                
//             })
//             await newPost.save();
//             console.log('user data added to the database');
//             return res.json({ msg: 'User data added to the database' });
//         }
//     } catch (error) {
//         console.error('Error during registration:', error);
//         return res.status(500).json({ error: 'Internal Server Error' });
//     }
// })


router.post('/api/customPost', verifyToken, async (req, res) => {
    try {
        const { title, body } = req.body;
        const userId = req.user._id; // Extract user ID from authenticated user
        console.log('user id =>', userId)
        const newPost = new Posts({ userId, title, id, body, isCustom: true });
        await newPost.save();
        return res.status(201).json({ message: 'Custom post created successfully' });
    } catch (error) {
        console.error('Error creating custom post:', error);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
});


// router.post('/api/custom-post', verifyToken, async (req, res) => {
//     try {
//         const { title, body } = req.body;
//         if (!title || !body) {
//             return res.status(400).json({ error: 'Please provide title and body for the post' });
//         }
//         const userId = req.user.userId;
//         const newPost = new Posts({ userId, title, body, isCustom: true });
//         await newPost.save();
//         return res.status(201).json({ message: 'Custom post created successfully' });
//     } catch (error) {
//         console.error('Error creating custom post:', error);
//         return res.status(500).json({ error: 'Internal Server Error' });
//     }
// });


// get just custom posts

// router.get('/api/custom-posts', async(req, res)=>{
//     try {
//         const posts = await Posts.find({isCustom:true});
//         res.status(200).json(posts);
//     } catch (error) {
//         console.log('Error fetching posts', error);
//         res.status(500).json({ error: 'Internal Server Error' });
//     }
// })


// Modify the route to get custom posts to filter based on the currently logged-in user
// Define the route to fetch custom posts
router.get('/api/custom-posts', verifyToken, async (req, res) => {
    try {
        const userId = req.user._id; 
        console.log('User ID:', userId); // Debugging statement

        // Retrieve custom posts for the current user
        const posts = await Posts.find({ isCustom: true, userId: userId });
        console.log('Custom Posts:', posts); // Debugging statement
        
        return res.status(200).json(posts);
    } catch (error) {
        console.log('Error fetching custom posts:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});






module.exports = router;