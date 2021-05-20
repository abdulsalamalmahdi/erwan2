let express = require('express'),
  mongoose = require('mongoose'),
  cors = require('cors'),
  bodyParser = require('body-parser');
  let history = require('connect-history-api-fallback');
  //dbConfig = require('./db/database');


// Routes to Handle Request
const userRoute = require('./routers')
const passport = require("passport");

// MongoDB Setup


mongoose.Promise = global.Promise;
// let mongoUrl;
//  if (process.env.NODE_ENV === "production") {
//   mongoUrl = process.env.DB;
//  } else {
//    mongoUrl = "mongodb://localhost:27017/chat";
//  }
mongoose.connect( "mongodb://localhost:27017/chat", {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  console.log('Database sucessfully connected')
},
  error => {
    console.log('Database could not be connected: ' + error)
  }
)

// Setup Express.js
const app = express();
app.options('*', cors())

  app.use(cors());
app.use(history());
 
// if (process.env.NODE_ENV === 'production') {
//  app.use(express.static( __dirname + '/dist/'));

 
// app.get(/.*/, function (req, res) { res.sendFile( __dirname + '/dist/index.html') });
//}

app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({
  extended: true,
  limit: '50mb',
  parameterLimit: 1000000
}));



// Make Images "Uploads" Folder Publicly Available
//app.use('/public', express.static('public'));


// API Route
app.use('/api', userRoute)

const port = process.env.PORT || 4000;
 app.listen(port, () => {
  console.log('Connected to port ' + port)
})
 
//dotenv
require("dotenv").config();

// Pass the global passport object into the configuration function
require("./lib/passport")(passport);
// This will initialize the passport object on every request
app.use(passport.initialize());
// Error
// app.use((req, res, next) => {
//   // Error goes via `next()` method
//   setImmediate(() => {
//     next(new Error('Something went wrong'));
//   });
// });

// app.use(function (err, req, res) {
//   console.error(err.message);
//   if (!err.statusCode) err.statusCode = 500;
//   res.status(err.statusCode).send(err.message);
// });