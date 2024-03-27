const bcrypt = require('bcrypt');
const User = require('../model/userSchema');


////////// Login ///////////

const login =  async (req, res) => {
    const {email, password} = req.body;
    if(!email || !password ){
        return res.json({error:'plz filled the field'})
        }
        try {
            const loginUser = await User.findOne({email:email})
            // console.log(loginUser);
            if(loginUser){
                const isMatch = await bcrypt.compare(password, loginUser.password)
                if(isMatch){
                const token = await loginUser.generateAuthToken();
                console.log('Generated Token:', token);
                    console.log('signin successful');
                    return res.json({ token: token, loginUser: loginUser });
                }else{
                    return res.json({error:'wrong password'})
                }
            }
           
        } catch (error) {
            console.error('Error during signin:', error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
}
module.exports = login