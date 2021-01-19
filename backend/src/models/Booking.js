const mongoose = require('mongoose');

const BookingSchema = new mongoose.Schema({
    date: String,
    approved: Boolean,
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref:'User'
    },
    photoshoot: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'PhotoShoot'
    }
});

module.exports = mongoose.model('Booking', BookingSchema);