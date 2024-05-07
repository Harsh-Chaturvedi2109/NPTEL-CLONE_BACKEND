const express = require("express")
const router = express.Router()
const testimonialController = require("../controller/testimonial")
router.get("/",testimonialController.getTestimonials)
.post("/", testimonialController.addTestimonial);

exports.router = router
