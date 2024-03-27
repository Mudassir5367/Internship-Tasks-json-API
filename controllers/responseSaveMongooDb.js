const Posts = require('../model/postSchema')

 // Route to save data Posts in database
 const resSaveMongooDB = async (req, res) => {
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
};
module.exports = resSaveMongooDB