const mongoose = require('mongoose');
const Schema = mongoose.Schema; 

const companySchema = new Schema({  
    companyName: {
        type: String,
        trim: true
    },
    companyWebsite: {
        type: String,
        trim: true
    },
    jobDescription: {  
        type: String,
        required: true
    },
    candidateNo: {  
        type: Number,
        required: true
    },
    startDate: {
        type: Date,
        default: Date.now
    },
    endDate: {
        type: Date
    },
    creatorId: {  
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
        unique: false 
    },
    candidateApplied: { 
        type: Number,
        default: 0
    }
});

 
module.exports = mongoose.model('CompanyDB', companySchema);