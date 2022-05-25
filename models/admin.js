const   mongoose = require('mongoose');

const adminSchema = new mongoose.Schema({
    fullname: String,
    img: String,
    album: String
});


module.exports = mongoose.model('Admin', adminSchema);