const mongoose =  require('mongoose');
const User = require('../models/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');


const HandleUserLogin = async (req,res)=>{
    const {user,password} = req.body;
    if(!user||!password) return res.status(400).json({"message":"username and password are required"});

    const findUser = await User.findOne({username:user}).exec();

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
            { "username": findUser.username },
            process.env.REFRESH_TOKEN_SECRET,
            { expiresIn: '1d' }
        );
        findUser.refreshToken=refreshToken;

        const result =await  findUser.save();
        console.log(result);
        console.log(role);
        //refersh Token

        res.cookie('jwt', refreshToken, { httpOnly: true, secure: true, sameSite: 'None', maxAge: 24 * 60 * 60 * 1000 });
         //accesss token
          res.json({ role, accessToken });
    }
    else{
        res.sendStatus(401);
    }
}

module.exports= {HandleUserLogin}