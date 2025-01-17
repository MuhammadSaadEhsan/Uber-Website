const dotenv = require('dotenv');
dotenv.config();
const cors = require('cors');
const express = require('express');
const app = express();
const connectDB = require('./DB/db');
const userRouter = require('./routes/user');
const cookieParser = require('cookie-parser')

connectDB();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cookieParser())

app.get('/', (req, res) => {
    res.send('Hello World');
})

app.use('/users', userRouter);


module.exports = app;