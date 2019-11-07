const dotenv = require('dotenv');
const mongoose = require('mongoose');

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

const app = require('./app');

const port = process.env.PORT || 8000;
app.listen(port, () => {
  console.log(`App running on port ${port}`);
});
