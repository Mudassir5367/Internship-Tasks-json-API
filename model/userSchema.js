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
module.exports = User;