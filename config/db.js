const mongoose = require('mongoose');
const connection = mongoose.createConnection('mongodb://localhost:27017/Room').on('open', ()=>{
    console.log('MongoDB connected successfully');
}).on('error', ()=>{
    console.log('MongoDB connection failed');
});
module.exports = connection;