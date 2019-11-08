/* eslint-disable node/no-unsupported-features/es-syntax */
const Tour = require('../models/tourModel');

exports.getAllTours = async (req, res) => {
  const query = { ...req.query };
  const excludedFields = ['page', 'sort', 'limit', 'fields'];
  excludedFields.forEach(field => delete query[field]);

  try {
    const allTours = await Tour.find(query);
    res.status(200).json({
      status: 'success',
      results: allTours.length,
      data: {
        tours: allTours
      }
    });
  } catch (err) {
    res.status(500).json({ status: 'fail', message: '' });
  }
};

exports.getTour = async (req, res) => {
  try {
    const { id } = req.params;
    const tour = await Tour.findById(id);

    res.status(200).json({
      status: 'success',
      data: {
        tour: tour
      }
    });
  } catch (err) {
    res.status(404).json({ status: 'fail', message: err });
  }
};

exports.createTour = async (req, res) => {
  try {
    const newTour = await Tour.create(req.body);
    res.status(201).json({
      status: 'success',
      data: {
        tour: newTour
      }
    });
  } catch (err) {
    res.status(400).json({ status: 'fail', message: 'Invalid data sent!' });
  }
};

exports.updateTour = async (req, res) => {
  try {
    const { id } = req.params;
    console.log(id);
    const updatedTour = await Tour.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true
    });
    res.status(200).json({
      status: 'success',
      data: {
        tour: updatedTour
      }
    });
  } catch (err) {
    res.status(400).json({ status: 'fail', message: err });
  }
};

exports.deleteTour = async (req, res) => {
  try {
    const { id } = req.params;
    await Tour.findByIdAndDelete(id);

    res.status(204).json({
      status: 'success',
      data: {
        tour: null
      }
    });
  } catch (err) {
    res.status(404).json({ status: 'fail', message: err });
  }
};
