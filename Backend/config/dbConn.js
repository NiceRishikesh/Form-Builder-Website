const mongoose = require('mongoose');
const MONGODB_URL = ''


function Connectdb() {
    mongoose.connect(MONGODB_URL)
        .then(() => {
            console.log('Connected to MongoDB');
        })
        .catch((error) => {
            console.error('MongoDB connection error:', error);
        });
}

module.exports = { Connectdb };
