const express = require('express');
const authRouter = express.Router();
const bcrypt = require('bcrypt');
const validator = require('validator');
const User = require('../models/userModel');
const { validateSignupData } = require('../validations/validation');

// User Signup
authRouter.post('/signup', async (req, res) => {
  try {
    validateSignupData(req);

    const { name, email, password } = req.body;

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new User({
      name,
      email,
      password: hashedPassword,
    });

    const savedUser = await user.save();
    const token = await savedUser.getJWT();
    res.cookie('token', token, { secure: true, sameSite: 'None' });
    res.send({ message: 'User Signed Up successfully', data: savedUser });
  } catch (error) {
    res.status(500).send('ERROR : ' + error.message);
  }
});

authRouter.post('/login', async (req, res) => {
  const { email, password } = req.body;
  try {
    if (!validator.isEmail(email)) {
      throw new Error('Invalid email format!');
    }
    const user = await User.findOne({ email });

    if (!user) {
      throw new Error('Invalid Credentials!');
    }

    const isPasswordValid = await user.validatePassword(password);

    if (isPasswordValid) {
      const token = await user.getJWT();
      res.cookie('token', token, { secure: true, sameSite: 'None' });
      res.send(user);
    } else {
      throw new Error('Invalid Credentials!');
    }
  } catch (error) {
    res.status(500).send('ERROR : ' + error.message);
  }
});

module.exports = authRouter;
