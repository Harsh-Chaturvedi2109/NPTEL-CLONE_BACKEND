const mongoose = require("mongoose");
const {Schema} = mongoose;

const testimonialSchema = new Schema({
    text: String,
    rating: Number,
    date: { type: Date, default: Date.now },
})

exports.Testimonial = mongoose.model('Testimonial',testimonialSchema);
