var createError = require('http-errors');
var express = require('express');
var bodyParser = require('body-parser')
var cookieParser = require('cookie-parser');

const mongoose = require("mongoose");

var cors = require('cors')
require('dotenv').config()

const PORT = process.env.PORT || 4000
const MONGODB_URI = process.env.MONGODB_URI

var app = express();


app.use(cors())

app.use('/uploads', express.static('./uploads'));

app.use(cookieParser());

//ROUTES HERE
var authRoutes = require('./routes/auth.routes')
var serviceRoutes = require('./routes/services.routes')
var hotelRoutes = require('./routes/hotel.routes')


// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

app.use(express.json());
app.use(express.urlencoded({
  extended: true,
  limit: '50mb'
}));
//PATHS HERE
app.use('/auth', authRoutes)
app.use('/service', serviceRoutes)
app.use('/hotel', hotelRoutes)

mongoose
  .connect(MONGODB_URI, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    useCreateIndex: true,
  })
  .then(() => {
    console.log("database connected.......");
  })
  .catch((err) => {
    console.log(err);
  });

app.listen(PORT, () => console.log("Server is running..."));
module.exports = app;