require('dotenv').config()

const express = require('express');
const mongoose=require('mongoose');
const cookieParser = require('cookie-parser');
const { connectDB } = require('./config/dbConn');
const app = express();
const port = process.env.PORT||3500;

connectDB();


app.use(express.json());
app.use(cookieParser());



app.use('/register', require('./routes/register'));
app.use('/auth',require('./routes/auth'));
app.use('/logout',require('./routes/logout'));
app.use('/apply'),require('./routes/jobApplication');
app.use('./jobPost',require('./routes/jobpost')) ;

mongoose.connection.once('open', () => {
    console.log('Connected to MongoDB');
    app.listen(port, () => console.log(`Server running on port ${port}`));
});
