const User =require('../models/user');
const express = require('express');
const bcrypt = require('bcrypt');

const  HandleNewUser = async (req,res)=>{
    const {user,password} = req.body;
    if(!user||!password) return res.status(400).json({
        "message":" username and password both are required"
    })
    const duplicate = await User.findOne({username:user}).exec();

    if(duplicate) return res.status(409).json({
        'message':"user already exist"
    })
    try {

        const hashedPwd = await bcrypt.hash(password, 10);
        const data = await User.create({
            username:user,
            password:hashedPwd,
        });
        console.log('user created');
        res.status(201).json({ 'success': `New user ${user} created!` });
    } catch (error) {
        res.status(500).json({ 'message': error.message });
    }
}

module.exports = {HandleNewUser}
