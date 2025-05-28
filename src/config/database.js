const mongoose = require('mongoose');

const connectDB = async () => {
  await mongoose.connect(
    'mongodb+srv://pgumthanavar05:62UVxGvFiN14JFkY@course-management.ffhc4yl.mongodb.net/'
  );
};

module.exports = connectDB;
