 const mongoose = require('mongoose');
 const Schema = mongoose.Schema

 const userApplicationSchema = new Schema({
    companyName:{
        type:String
    },
    status:{
        Applied:{
            type:Boolean
        },
        Pending:{
            type:Boolean
        },
        Rejected:{
            type:Boolean
        }
    },
    userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
    unique: true  
  },
  appliedDate:{
    type:Date,
    default:Date.now
  }
 })
 module.exports = mongoose.model('UserApplication',userApplicationSchema)