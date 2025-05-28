const mongoose = require('mongoose');

const courseSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      minLength: 3,
    },
    description: {
      type: String,
      required: true,
      minLength: 3,
    },
    price: {
      type: Number,
      required: true,
    },
    image: {
      type: String,
      default:
        'https://img.freepik.com/premium-vector/graduation-illustration-graduation-cap-books-education-concept-white-isolated_138676-643.jpg?semt=ais_hybrid&w=740',
    },
    creatorId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const courseModel = mongoose.model('Course', courseSchema);
module.exports = courseModel;
