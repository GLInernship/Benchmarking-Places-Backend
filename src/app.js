const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const morgan = require('morgan'); // Import morgan

// Load environment variables from .env file
dotenv.config();

const app = express();

// Middleware to log requests
app.use(morgan('combined')); // Use morgan to log requests in 'combined' format

// Middleware to parse JSON
app.use(express.json());
app.use(cors({
  origin: ['http://localhost:3000', 'https://glinernship.github.io'], // Allow these frontend origins
  methods: ['GET', 'POST'], // Allowed methods
  allowedHeaders: ['Content-Type', 'Authorization'] // Allowed headers
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

// Import routes
const nearbyPlaceRoutes = require('./routes/nearbyPlaceRoutes');
const gridDataRoutes = require('./routes/gridDataRoutes');
const resultRoutes = require('./routes/resultRoutes');
const googlePlaceRoutes = require('./routes/googlePlaceRoutes');


// Use routes
app.use('/api', nearbyPlaceRoutes);
app.use('/api', gridDataRoutes);
app.use('/api', resultRoutes);
app.use('/api', googlePlaceRoutes);

module.exports = app;
