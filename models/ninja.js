const mongoose = require('mongoose');

const Schema = mongoose.Schema;

// create geolocation schema
const GeolocationSchema = new Schema({
    type: {
        type: String,
        default: 'Point'
    },
    coordinates: {
        type: [Number],
        index: "2dsphere"
    }
})

// create ninja model and schema
const NinjaSchema = new Schema({
    name: {
        type: String,
        required: [true, 'Name is required']
    },
    rank: {
        type: String
    },
    available: {
        type: Boolean,
        default: false
    },
    geometry: GeolocationSchema
});

const Ninja = mongoose.model('ninja', NinjaSchema);

module.exports = Ninja;