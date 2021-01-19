const mongoose = require('mongoose');

const PhotoShootSchema = new mongoose.Schema({
    thumbnail: String,
    photoshoot: String,
    price: Number,
    phototype: String,
    name: String,
    packs: [String],
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
}, {
  toJSON: {
    virtuals: true,
  }
});

PhotoShootSchema.virtual('thumbnail_url').get(function() {
  return `http://localhost:3333/files/${this.thumbnail}`
})

module.exports = mongoose.model('PhotoShoot', PhotoShootSchema);