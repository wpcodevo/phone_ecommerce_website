const dotenv = require('dotenv');

dotenv.config({ path: './config/config.env' });

const app = require('./app');

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(
    `Server started in ${process.env.NODE_ENV} mode on port: ${PORT}`
  );
});
