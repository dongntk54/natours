const express = require('express');
const {
  getAllTours,
  createTour,
  getTour,
  updateTour,
  deleteTour,
  alias,
  getToursStatistic,
  getMonthlyPlan
} = require('../controllers/tourController');

const { top5Cheap, topRating } = require('../alias');

const tourRouter = express.Router();

tourRouter.route('/top-5-cheap').get((req, res, next) => {
  alias(top5Cheap, req, res, next);
}, getAllTours);

tourRouter.route('/top-rating').get((req, res, next) => {
  alias(topRating, req, res, next);
}, getAllTours);

tourRouter.route('/getToursStatistic').get(getToursStatistic);
tourRouter.route('/monthly-plan/:year').get(getMonthlyPlan);

tourRouter
  .route('/')
  .get(getAllTours)
  .post(createTour);
tourRouter
  .route('/:id')
  .get(getTour)
  .patch(updateTour)
  .delete(deleteTour);

module.exports = tourRouter;
