const Posts = require('../model/postSchema')




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
const getCustomPostsByLoginUser = async (req, res) => {
    try {
        const userId = req.user._id; 
        console.log('User ID:', userId); // Debugging statement

        // Retrieve custom posts for the current user
        const posts = await Posts.find({ users: userId }).sort({time:-1});
        console.log('Custom Posts:', posts);
        
        return res.status(200).json(posts);
    } catch (error) {
        console.log('Error fetching custom posts:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

module.exports = getCustomPostsByLoginUser;