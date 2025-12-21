const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userApplicationSchema = new Schema({
  company: {   
    type: mongoose.Schema.Types.ObjectId,
    ref: "Company",
    required: true
     
  },
  user: {  
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
     
  },
  status: {
    type: String,
    enum: ['Applied', 'Pending', 'Rejected'],  
    default: 'Applied'
  },
  appliedDate: {
    type: Date,
    default: Date.now
  }
});


userApplicationSchema.index({ user: 1, company: 1 }, { unique: true });

module.exports = mongoose.model('UserApplication', userApplicationSchema);