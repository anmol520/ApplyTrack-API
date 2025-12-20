const mongoose =  require('mongoose');
const model = require('../models/user');
const bcrypt = require('bcrypt');


const HandleUserLogin = async (req,res)=>{
    const {user,password} = req.body;
    if(!user||!password) return res.status(400).json({"massage":"username and password are required"});

    const findUser = await user.findOne({username:user}).exec();

    if(!findUser) return res.sendStatus(401);
    const match = await bcrypt.compare(password,findUser.password);

    if(match){
        const role = findUser.role;

        const accessToken = jwt.sign({
            "UserInfo": {
                    "username": findUser.username,
                    "roles": role
                }},
                process.env.ACCESS_TOKEN_SECRET,
                {expiresIn: '10s'}
        );
         const refreshToken = jwt.sign(
            { "username": foundUser.username },
            process.env.REFRESH_TOKEN_SECRET,
            { expiresIn: '1d' }
        );
        findUser.refreshToken=refreshToken;

        const result =  findUser.save();
        console.log(result);
        console.log(role);
        //refersh Token

        res.cookie('jwt', refreshToken, { httpOnly: true, secure: true, sameSite: 'None', maxAge: 24 * 60 * 60 * 1000 });
         //accesss token
          res.json({ roles, accessToken });
    }
    else{
        res.sendStatus(401);
    }
}

module.exports= {HandleUserLogin}