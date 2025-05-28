const express = require('express');
const courseRouter = express.Router();
const { userAuth } = require('../middlewares/auth');
const { validateCourseData } = require('../validations/validation');

const Course = require('../models/courseModel');

courseRouter.post('/course/create', userAuth, async (req, res) => {
  try {
    validateCourseData(req);

    const { title, description, price, image } = req.body;
    const creatorId = req.user._id;

    const course = new Course({
      title,
      description,
      price,
      image,
      creatorId,
    });

    const savedCourse = await course.save();
    res.send({ message: 'Course added successfully', data: savedCourse });
  } catch (err) {
    res.status(500).send('ERROR : ' + err.message);
  }
});

courseRouter.get('/course/view', userAuth, async (req, res) => {});

module.exports = courseRouter;
