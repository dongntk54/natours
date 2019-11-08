const dotenv = require('dotenv');
const mongoose = require('mongoose');
const fs = require('fs');
const Tour = require('../../models/tourModel');

if (process.env.NODE_ENV === 'Dev') {
  dotenv.config({
    path: './Dev.env'
  });
} else {
  dotenv.config({
    path: './Prod.env'
  });
}

const DB = process.env.DATABASE.replace(
  '<PASSWORD>',
  process.env.DATABASE_PASSWORD
);

mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false
  })
  .then(() => {
    console.log('DB connection successful!');
  });

const tours = JSON.parse(
  fs.readFileSync(`${__dirname}/tours-simple.json`, 'utf-8')
);

const mode = process.argv[2];

const importData = async () => {
  try {
    await Tour.create(tours);
    console.log('Import data successfuly!');
    process.exit();
  } catch (err) {
    console.log('Fail to import data!');
    console.log(err);
    process.exit();
  }
};

const deleteData = async () => {
  try {
    await Tour.deleteMany();
    console.log('Delete data successfuly!');
    process.exit();
  } catch (err) {
    console.log('Fail to delete data!');
    console.log(err);
    process.exit();
  }
};

if (mode === '--import') {
  importData();
} else if (mode === '--delete') {
  deleteData();
} else {
  console.log('Unrecognized mode!');
  process.exit();
}
