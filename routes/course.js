const express = require("express");
const router = express.Router();
const courseController = require("../controller/course.js");
const multer = require('multer');

const upload = multer({ storage: multer.memoryStorage() });

router.post("/", upload.array('chapterFiles'), courseController.addCourse)
      .get("/getAllCourses", courseController.getAllCourses)
      .get("/getCourse/:id", courseController.getCourse);

exports.router= router;