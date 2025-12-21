 const UserApplication = require('../models/userApplication');
const CompanyDB = require('../models/company');

const HandleUserApplication = async (req, res) => {
    try {
        const { companyId } = req.body;
        const userId = req.user.id;  
         
        const existingApplication = await UserApplication.findOne({ 
            user: userId, 
            company: companyId 
        });

        if (existingApplication) {
            return res.status(400).json({ 
                message: "You have already applied to this position." 
            });
        }

         
        const newApplication = new UserApplication({
            company: companyId,
            user: userId,
            status: 'Applied'  
        });

        await newApplication.save();

         
        await CompanyDB.findByIdAndUpdate(companyId, {
            $inc: { candidateApplied: 1 }
        });

        res.status(201).json({
            message: "Application submitted successfully!",
            application: newApplication
        });

    } catch (error) {
        console.error("Application Error:", error);
        res.status(500).json({ message: "Server error", error: error.message });
    }
};

module.exports = { HandleUserApplication };