const mongoose = require('mongoose');
const Schema = mongoose.Schema

const userSchema = new Schema({
    username:{
        type: String,
        required : true
    },
    password:{
        type: String,
        required: true
    },
    role: {
        type: String,
        enum: ['student', 'company', 'admin'],
        default: 'student'
},
    refreshToken: {
        type:String
    }

})

module.exports = mongoose.model('User', userSchema);
