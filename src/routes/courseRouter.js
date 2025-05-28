const express = require('express');
const courseRouter = express.Router();
const { userAuth } = require('../middlewares/auth');
const { validateCourseData } = require('../validations/validation');
const mongoose = require('mongoose');
const ObjectId = mongoose.Types.ObjectId;
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

courseRouter.get('/course/view/all', userAuth, async (req, res) => {
  try {
    const creatorId = req.user._id;

    const courses = await Course.find({
      creatorId,
    }).select('title description price image creatorId');
    if (courses.length === 0) {
      return res.send('No courses found!');
    }

    res.send({
      message: 'Courses found!',
      data: courses,
    });
  } catch (err) {
    res.status(500).send('ERROR : ' + err.message);
  }
});

courseRouter.get('/course/view/:courseId', userAuth, async (req, res) => {
  try {
    const courseId = req.params.courseId;

    if (!ObjectId.isValid(courseId)) {
      throw new Error('Invalid course Id!');
    }
    const course = await Course.find({
      _id: courseId,
      creatorId: req.user._id,
    }).select('title description price image creatorId');

    if (course.length === 0) {
      return res.send('No course found!');
    }

    res.send({
      message: 'Course found!',
      data: course,
    });
  } catch (err) {
    res.status(500).send('ERROR : ' + err.message);
  }
});

module.exports = courseRouter;
