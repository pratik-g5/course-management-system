const express = require('express');
const courseRouter = express.Router();
const { userAuth } = require('../middlewares/auth');
const {
  validateCourseData,
  validateCourseUpdate,
} = require('../validations/validation');
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

courseRouter.patch('/course/edit/:courseId', userAuth, async (req, res) => {
  try {
    if (!validateCourseUpdate(req)) {
      return res.send('Edit Not allowed');
    }
    const courseId = req.params.courseId;
    const course = await Course.findOne({
      _id: courseId,
      creatorId: req.user._id,
    });
    if (!course) {
      return res.send('No course found to update!');
    }

    Object.keys(req.body).forEach((key) => {
      course[key] = req.body[key];
    });

    await course.save();

    res.json({
      message: 'Course updated successfully!',
      Course: course,
    });
  } catch (err) {
    res.status(500).send('ERROR : ' + err.message);
  }
});

courseRouter.delete('/course/delete/:courseId', userAuth, async (req, res) => {
  try {
    const courseId = req.params.courseId;

    if (!ObjectId.isValid(courseId)) {
      return res.status(400).send('Invalid course ID!');
    }

    const deletedCourse = await Course.findOneAndDelete({
      _id: courseId,
      creatorId: req.user._id,
    });

    if (!deletedCourse) {
      return res.status(404).send('No course found to delete!');
    }

    res.send({ message: 'Course deleted successfully!', data: deletedCourse });
  } catch (err) {
    res.status(500).send('ERROR : ' + err.message);
  }
});

module.exports = courseRouter;
