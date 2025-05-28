const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      validate(value) {
        if (!validator.isEmail(value)) {
          throw new Error('Invalid email: ' + value);
        }
      },
    },
    password: {
      type: String,
      required: true,
      minLength: 6,
    },
    photoUrl: {
      type: String,
      default:
        'https://t4.ftcdn.net/jpg/04/83/90/95/360_F_483909569_OI4LKNeFgHwvvVju60fejLd9gj43dIcd.jpg',
    },
    phone: {
      type: String,
    },
    location: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

userSchema.methods.getJWT = async function () {
  const user = this;
  const token = jwt.sign({ _id: user._id }, 'COURSE@DEV001', {
    expiresIn: '24h',
  });
  return token;
};

userSchema.methods.validatePassword = async function (userInputPassword) {
  const user = this;
  const isPasswordValid = await bcrypt.compare(
    userInputPassword,
    user.password
  );
  return isPasswordValid;
};

const UserModel = mongoose.model('User', userSchema);
module.exports = UserModel;
