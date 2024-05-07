const TestimonialModel = require("../models/testimonialModel");
const Testimonial = TestimonialModel.Testimonial
exports.getTestimonials = async (req, res) => {
    const testimonials = await Testimonial.find();
    const totalRatings = testimonials.length;
    const ratingBreakdown = [0, 0, 0, 0, 0]; // Counts for 1-star, 2-star, ..., 5-star
    let totalRatingScore = 0;
    testimonials.forEach((testimonial) => {
        ratingBreakdown[testimonial.rating - 1]++;
        totalRatingScore += testimonial.rating;
    });

    const averageRating = totalRatings > 0 ? (totalRatingScore / totalRatings).toFixed(1) : 0;

    res.json({ testimonials, totalRatings, averageRating, ratingBreakdown });
}

exports.addTestimonial = async (req, res) => {
    const { text, rating } = req.body;
    const newTestimonial = new Testimonial({ text, rating });
    await newTestimonial.save();
    res.json(newTestimonial);
}