const User = require('../model/userSchema');

const register = async(req, res)=>{
    // console.log(req.body);
    const {name, email, phone, password} = req.body;
    if(!name || !email || !phone || !password ){
        return res.json({error:'plz filled the field'})
        }
        try {
            
            const loginUser = await User.findOne({email:email})
            if(loginUser){
                return res.json({error:'user already exist'})
            }else{
                const user = new User({name, email, phone, password})
                // const newUser = new User({ name, email, phone, password });
                await user.save();
                console.log('user data added to the database');
                return res.json({ msg: 'User data added to the database' });
            }
        } catch (error) {
            console.error('Error during registration:', error);
            return res.status(500).json({ error: 'Internal Server Error' });
        }
};

module.exports = register;