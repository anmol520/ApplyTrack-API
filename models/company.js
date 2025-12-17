 const mongoose = require('mongoose');
 const Schema = mongoose.Schema();

 const companySchema =new Schema(
    {
        jobDiscription:{
            type:String,
            required:true
        },
        candidateNo :{
            type:Number,
            required:true
        },
        startDate:{
            type:Date,
            default:Date.now
        },
        endDate:{
            type:Date
        },
        userid:{
            type:mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
            unique: true
     
        }
    }
 )