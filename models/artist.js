const   mongoose = require('mongoose');

const artistSchema = new mongoose.Schema({
    fullname: String,
    img: String,
    album: String
});


module.exports = mongoose.model('Artist', artistSchema);