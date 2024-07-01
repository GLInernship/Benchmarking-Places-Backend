const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const morgan = require('morgan');

// Load environment variables from .env file
dotenv.config();

const app = express();

// Middleware to log requests
app.use(morgan('combined'));

// Middleware to parse JSON with increased limit
app.use(express.json({ limit: '500mb' }));
app.use(express.urlencoded({ limit: '500mb', extended: true, parameterLimit: 500000 }));

app.use(cors({
  origin: ['http://localhost:3000', 'https://glinernship.github.io'],
  methods: ['GET', 'POST'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

// Respond to GET request at "/"
app.get('/', (req, res) => {
  res.send('WELCOME TO BENCHMARKING PLACES BACKEND');
});

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('MongoDB connected'))
.catch(err => console.log(err));

// Import and use routes
const nearbyPlaceRoutes = require('./routes/nearbyPlaceRoutes');
const gridDataRoutes = require('./routes/gridDataRoutes');
const resultRoutes = require('./routes/resultRoutes');
const googlePlaceRoutes = require('./routes/googlePlaceRoutes');

app.use('/api', nearbyPlaceRoutes);
app.use('/api', gridDataRoutes);
app.use('/api', resultRoutes);
app.use('/api', googlePlaceRoutes);

module.exports = app;