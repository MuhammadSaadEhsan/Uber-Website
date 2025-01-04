const mongoose = require('mongoose');

const connectDB = async () => {
    mongoose.connect(process.env.DB_CONNECT).then(() => {
        console.log('Connected to database');
    }).catch((error) => {
        console.log('Connection failed', error);
    });
}

module.exports = connectDB;