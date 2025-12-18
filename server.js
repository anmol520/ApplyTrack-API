require('dotenv').config()
require('./config/dbConn');
require('./controllers/registercontroller');

const express = require('express');
const mongoose=require('mongoose');
const { connectDB } = require('./config/dbConn');
const app = express();


const port = process.env.PORT||3500;
app.use(express.json());
connectDB();

app.use('/register', require('./routes/register'));

mongoose.connection.once('open', () => {
    console.log('Connected to MongoDB');
    app.listen(port, () => console.log(`Server running on port ${port}`));
});
