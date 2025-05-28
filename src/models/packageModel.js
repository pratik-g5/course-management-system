const mongoose = require('mongoose');

const packageSchema = new mongoose.Schema(
  {
    title: {
      type: String,
    },
    courses: {
      type: [String],
      required: true,
    },
    creatorId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    image: {
      type: String,
      default:
        'https://img.freepik.com/premium-vector/graduation-illustration-graduation-cap-books-education-concept-white-isolated_138676-643.jpg?semt=ais_hybrid&w=740',
    },
  },
  {
    timestamps: true,
  }
);

const packageModel = mongoose.model('Package', packageSchema);
module.exports = packageModel;
