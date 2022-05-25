var mongoose = require('mongoose');

let musicSchema = new mongoose.Schema({
    title: String,
    lyrics: String,
    artistId: {type: mongoose.Schema.Types.ObjectId, ref: "Artist"},
    artistName: {type: mongoose.Schema.Types.String, ref: "Artist"},
    cover: String,
    audio: String
});

module.exports = mongoose.model('Music', musicSchema)