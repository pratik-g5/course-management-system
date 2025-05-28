const validator = require('validator');

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

module.exports = { validateSignupData };
