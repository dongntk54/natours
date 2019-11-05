const dotenv = require('dotenv');

if (process.env.NODE_ENV === 'Dev') {
  dotenv.config({
    path: './Dev.env'
  });
} else {
  dotenv.config({
    path: './Prod.env'
  });
}

const app = require('./app');

const port = process.env.PORT || 8000;
app.listen(port, () => {
  console.log(`App running on port ${port}`);
});
