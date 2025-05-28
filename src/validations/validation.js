const validator = require('validator');
const mongoose = require('mongoose');
const ObjectId = mongoose.Types.ObjectId;

const validateSignupData = (req) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    throw new Error('All fields are required!');
  } else if (!validator.isEmail(email)) {
    throw new Error('Invalid email format!');
  } else if (!validator.isStrongPassword(password)) {
    throw new Error('Enter a strong password.');
  }
};

const validateCourseData = (req) => {
  const { title, description, price, image } = req.body;

  if (!title || !description || !price) {
    throw new Error('All fields are required');
  }
  if (price < 0) {
    throw new Error('Price must be a positive integer');
  }
};

module.exports = { validateSignupData, validateCourseData };
