/* eslint-disable node/no-unsupported-features/es-syntax */
const fs = require('fs');

let tours = JSON.parse(
  fs.readFileSync(`${__dirname}/../dev-data/data/tours-simple.json`)
);

exports.checkBodyRequest = (req, res, next) => {
  if (!req.body.name || !req.body.price) {
    return res.status(400).json({
      status: 'fail',
      message: 'Missing name or price'
    });
  }
  next();
};

exports.checkID = (req, res, next, val) => {
  let found = false;
  for (let i = 0; i < tours.length; i + 1) {
    if (tours[i].id === val * 1) {
      found = true;
      break;
    }
  }
  if (found) {
    next();
  } else {
    res.status(404).json({
      status: 'fail',
      message: 'Invalid ID'
    });
  }
};

exports.getAllTours = (req, res) => {
  res.status(200).json({
    status: 'success',
    results: tours.length,
    data: {
      tours: tours
    }
  });
};

exports.getTour = (req, res) => {
  const id = req.params.id * 1;
  const tour = tours.find(el => el.id === id);

  res.status(200).json({
    status: 'success',
    data: {
      tour: tour
    }
  });
};

exports.createTour = (req, res) => {
  const newTour = {
    id: tours[tours.length - 1].id + 1,
    ...req.body
  };
  tours.push(newTour);
  fs.writeFile(
    `${__dirname}/../dev-data/data/tours-simple.json`,
    JSON.stringify(tours),
    err => {
      if (err) {
        return res
          .status(400)
          .json({ status: 'Fail', message: 'Fail to create a new tour' });
      }
      res.status(201).json({
        status: 'success',
        data: {
          tour: newTour
        }
      });
    }
  );
};

exports.updateTour = (req, res) => {
  const id = req.params.id * 1;
  const tour = tours.find(el => el.id === id);
  const updatedTour = {
    ...tour,
    ...req.body
  };

  tours = tours.map(el => {
    if (el.id === id) {
      return updatedTour;
    }
    return el;
  });

  fs.writeFile(
    `${__dirname}/../dev-data/data/tours-simple.json`,
    JSON.stringify(tours),
    err => {
      if (err) {
        return res
          .status(500)
          .json({ status: 'Fail', message: 'Fail to update tour' });
      }
      res.status(200).json({
        status: 'success',
        data: {
          tour: updatedTour
        }
      });
    }
  );
};

exports.deleteTour = (req, res) => {
  res.status(204).json({
    status: 'success',
    data: null
  });
};
