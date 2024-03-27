const Posts = require('../model/postSchema')


// custom post by login user


const customPostsByLoginUser =  async (req, res) => {
    try {
        const { title, id, body } = req.body;
        const data = await Posts.findOne({ id:id });
        if(data){
        console.log('Post with the same ID already exists');
        return res.json({msg:'Post with the same ID already exists'})
        }
        const userId = req.user._id; // Extract user ID from authenticated user
        console.log('user id =>', userId)
        const newPost = new Posts({ 
        title,
        id,
        users:userId,
        body,
     });
        await newPost.save();
        return res.status(201).json({ message: 'Custom post created successfully' });
    } catch (error) {
        console.error('Error creating custom post:', error);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
};
module.exports = customPostsByLoginUser;