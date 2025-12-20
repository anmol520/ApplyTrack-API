const User = require('../models/user');
const jwt = require('jsonwebtoken')

const HandleLogout = async(req,res)=>{
    const cookie = req.cookies;
    if(!cookie?.jwt) res.sendStatus(204);

    const refreshToken = cookie.jwt;
    const foundUser = await User.findOne({refreshToken:refreshToken}).exec();

    if(!foundUser){
        res.clearCookie('jwt', { httpOnly: true, sameSite: 'None', secure: true });
        return res.sendStatus(204);
    }
    
    foundUser.refreshToken="";
    const result = await foundUser.save();
    console.log(result);

    res.clearCookie('jwt', { httpOnly: true, sameSite: 'None', secure: true });
    res.sendStatus(204);
}
module.exports={HandleLogout};