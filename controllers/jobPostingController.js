 const CompanyDB = require('../models/company');

const HandleJobPosting = async (req, res) => {
    try {
        const { 
            companyName, 
            companyWebsite,  
            jobDescription, 
            candidateNo, 
            startDate, 
            endDate 
        } = req.body;

         
        if (!jobDescription || !candidateNo) {
            return res.status(400).json({ message: "Job description and candidate number are required." });
        }

         
        const newJob = new CompanyDB({
            companyName,
            companyWebsite,
            jobDescription,
            candidateNo,
            startDate,
            endDate,
            creatorId: req.user.id,  
            candidateApplied: 0     
        });

         
        const savedJob = await newJob.save();

         
        res.status(201).json({
            message: "Job posted successfully!",
            job: savedJob
        });

    } catch (error) {
        console.error("Error creating job:", error);
        res.status(500).json({ message: "Internal Server Error", error: error.message });
    }
};

module.exports = { HandleJobPosting };