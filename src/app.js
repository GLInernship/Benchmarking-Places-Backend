const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const dotenv = require('dotenv');

// Load environment variables from .env file
dotenv.config();

const app = express();

// Middleware to parse JSON
app.use(express.json());
app.use(cors({
  origin: ['http://localhost:3000', 'https://glinernship.github.io'], // Allow these frontend origins // Allow only your frontend origin
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

// Use routes
app.use('/api', nearbyPlaceRoutes);
app.use('/api', gridDataRoutes);

module.exports = app;
