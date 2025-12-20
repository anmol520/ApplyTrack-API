const User = require('../models/user');
const jwt= require('jsonwebtoken');

const HandleRefreshToken = async (req,res)=>{
    const cookies = req.cookies;
    if(!cookies?.jwt) return res.sendStatus(401);

    const refreshToken = cookies.jwt;

    const foundUser = await User.findOne({refreshToken:refreshToken}).exec();
    if(!foundUser) return res.sendStatus(403);

    jwt.verify(
        refreshToken,
        process.env.REFRESH_TOKEN_SECRET,
        (err,decoded)=>{
            if(err ||foundUser.username!==decoded.username) return res.sendStatus(403);
            const role= foundUser.role;
         const  accessToken = jwt.sign({
               "UserInfo": {
                    "username": foundUser.username,
                    "roles": role
                }
        },
                process.env.ACCESS_TOKEN_SECRET,
                {expiresIn: '15m'}
                 
            )
            res.json({role,accessToken});
        }
    )
}

module.exports={HandleRefreshToken};