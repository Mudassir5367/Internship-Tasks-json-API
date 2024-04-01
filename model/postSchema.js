const mongoose = require('mongoose');

// Posts Schema

const postsSchema = new mongoose.Schema({
    
    id:{
        required: true,
        type: Number
    },
    title:{
        type: String,
        required: true
    },
    body:{
        type: String,
        required: true
    },
    time:{
        type: Date,
        default: Date.now
    },
    // isCustom: { type: Boolean, default: false } ,
    users: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        // required: true
    }, 
    likes: [{
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        },
        name: String, // Add fields as needed to store user details
        // Add more fields as needed
    }],   
})


const Posts = mongoose.model('Post',postsSchema);
module.exports = Posts;