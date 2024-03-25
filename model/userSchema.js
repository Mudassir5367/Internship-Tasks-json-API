const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')

const userSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true,
        unique: true
    },
    phone:{
        type: Number,
        required: true
    },
    password:{
        type: String,
        required: true
    }
})



// Posts Schema

const postsSchema = new mongoose.Schema({
    userId: {
        type: String,
        required: true
    },
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
    isCustom: { type: Boolean, default: false } ,
    users: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        // required: true
    },    
})


userSchema.pre('save', async function(next){
  if(this.isModified('password')){
    this.password = await bcrypt.hash(this.password, 12);
  }
  next()
})

// jwt Token

userSchema.methods.generateAuthToken = async function(){
    const tokenData = jwt.sign({_id:this._id}, 'SECRETKEY');
    return tokenData;
}



const User = mongoose.model('User',userSchema)
// module.exports = User;


const Posts = mongoose.model('Post',postsSchema);
module.exports = {User,Posts};