const Posts = require('../model/postSchema')

// single card or id details get
const getSingleCard = async (req, res) => {
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
};

module.exports = getSingleCard;