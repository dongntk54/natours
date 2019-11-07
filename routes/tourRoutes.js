const express = require('express');
const {
  getAllTours,
  createTour,
  getTour,
  updateTour,
  deleteTour,
  checkBodyRequest
} = require('../controllers/tourController');

const tourRouter = express.Router();

// tourRouter.param('id', checkID);

tourRouter
  .route('/')
  .get(getAllTours)
  .post(checkBodyRequest, createTour);
tourRouter
  .route('/:id')
  .get(getTour)
  .patch(updateTour)
  .delete(deleteTour);

module.exports = tourRouter;
