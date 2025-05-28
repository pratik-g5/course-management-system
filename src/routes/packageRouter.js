const express = require('express');
const packageRouter = express.Router();
const { userAuth } = require('../middlewares/auth');
const { validatePackageData } = require('../validations/validation');
const mongoose = require('mongoose');
const ObjectId = mongoose.Types.ObjectId;
const Package = require('../models/packageModel');

packageRouter.post('/package/create', userAuth, async (req, res) => {
  try {
    validatePackageData(req);

    const { title, courses, image } = req.body;
    const creatorId = req.user._id;

    const package = new Package({
      title,
      courses,
      creatorId,
      image,
    });

    const savedPackage = await package.save();
    res.send({ message: 'Course added successfully', data: savedPackage });
  } catch (err) {
    res.status(500).send('ERROR : ' + err.message);
  }
});

packageRouter.delete('/package/delete/:id', userAuth, async (req, res) => {
  try {
    const packageId = req.params.id;

    if (!ObjectId.isValid(packageId)) {
      return res.status(400).send('Invalid package ID!');
    }

    const deletedPackage = await Package.findOneAndDelete({
      _id: packageId,
      creatorId: req.user._id,
    });

    if (!deletedPackage) {
      return res.status(404).send('No package found to delete!');
    }

    res.send({
      message: 'Package deleted successfully!',
      data: deletedPackage,
    });
  } catch (err) {
    res.status(500).send('ERROR : ' + err.message);
  }
});

module.exports = packageRouter;
