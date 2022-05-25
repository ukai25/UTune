var mongoose = require('mongoose');

let trendingSchema = new mongoose.Schema({
    title: String,
    artist: String,
    lyrics: String,
    cover: String,
    music: String
});

module.exports = mongoose.model('Trending', trendingSchema)