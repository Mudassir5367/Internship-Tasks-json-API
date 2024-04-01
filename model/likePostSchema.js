const mongoose = require('mongoose');

const likeSchema = new mongoose.Schema({
  postId: {
    type: Number,
    ref: 'Post', // Assuming you have a Post model
    // required: true
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', // Assuming you have a User model
    // required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});
const Like =  mongoose.model('Like', likeSchema);
module.exports = Like;
