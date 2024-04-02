const Posts = require('../model/postSchema');

const postComments = async (req, res) => {
    const postId = req.params.postId;
    const comment = req.body.comment;
    console.log(postId, comment);

    try {
        const post = await Posts.findOne({ id: postId });
        if (!post) {
            return res.status(404).json({ error: 'Post not found' });
        }

        post.comments.push(comment); // Push the comment string directly
        await post.save();
        res.json(post);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Server Error' });
    }
};

module.exports = postComments;
