const  Course = require('../models/courseModel'); // Import the Course model

exports.addCourse = async (req, res) => {
    try {
      const { title, instructor, discipline, institute, modules } = req.body;
  
      const newModules = modules.map((mod) => {
        const chapters = mod.chapters.map((chapter) => {
          return {
            ...chapter,
            textContent: chapter.content, 
            videoContent: chapter.videoContent, 
          };
        });
  
        return {
          title: mod.title,
          description: mod.description,
          chapters,
        };
      });
  
      const course = new Course({
        title,
        instructor,
        discipline,
        institute,
        modules: newModules,
      });
  
      await course.save(); // Save the course to the database
  
      res.status(201).json({ message: 'Course added successfully', course });
    } catch (err) {
      console.error('Error adding course:', err.message);
      res.status(500).json({ error: 'Error adding course', details: err.message });
    }
  };
exports.getAllCourses = async (req, res) => {
  try {
    const courses = await Course.find().populate('modules.chapters');
    res.status(200).json(courses);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error fetching courses' });
  }
};

exports.getCourse = async (req, res) => {
  try {
    const course = await Course.findById(req.params.id).populate('modules.chapters');
    if (!course) {
      return res.status(404).json({ error: 'Course not found' });
    }
    res.status(200).json(course);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error fetching course' });
  }
};