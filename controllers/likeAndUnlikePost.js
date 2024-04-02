const Posts = require('../model/postSchema')

const likeAndUnlikePost = async(req, res)=>{
    const userId = req.user._id;
    const postId = req.body.postId;
    console.log(postId);

    try {
        const post = await Posts.findOne(postId);
        if(!post){
            return res.status(404).json({error: 'Post not found'});
        }

        const index = post.likes.findIndex(like => like.user.equals(userId));
        if(index === -1){
            // like the post
            post.likes.push({user: userId});
        }else{
            // unlike the post
            post.likes.splice(index, 1);
        }

        await post.save()
        res.json(post.likes)

    } catch (error) {
        console.log(error);
        res.status(500).json({error: 'Server Error'})
    }
}

module.exports = likeAndUnlikePost;