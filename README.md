# Backend for Nearby Places Comparison Tool

## Overview
This backend application supports the Nearby Places Comparison Tool, which compares data from Google Maps API and HERE Geocoding & Reverse Geocoding API. It handles data processing, storage, and serves as an API for the frontend application.

## Features
- Express.js server setup
- MongoDB integration for data storage
- API endpoints for fetching and storing place data
- Data processing for comparing Google Maps and HERE WeGo results
- CORS enabled for cross-origin requests

## Technology Stack
- Node.js
- Express.js
- MongoDB (with Mongoose ODM)
- CORS middleware

## Setup and Installation
1. Clone the repository
2. Install dependencies: `npm install`
3. Set up environment variables:
   - Create a `.env` file in the root directory
   - Add `MONGODB_URI=your_mongodb_connection_string`
4. Start the server: `npm start`

## Database Structure
Database Name: nearbyplaces
Collections:
- subregions: Stores subregion details
- ranLatLons: Stores information about random latitude and longitude points and their nearby places as an array


## API Endpoints
- GET /api/places: Fetches all stored places
- POST /api/places: Adds new place data
- GET /api/subregions: Retrieves subregion information
- POST /api/subregions: Adds new subregion data

## Data Processing
- Compares coordinates from Google Maps and HERE WeGo
- Calculates distance between coordinates
- Processes and stores relevant place information

## Error Handling
- Implements try-catch blocks for database operations
- Provides appropriate error responses for API failures

## Security
- Implements basic security measures (e.g., helmet middleware)
- Sanitizes input data before database operations

## Future Improvements
- Implement user authentication
- Add rate limiting for API requests
- Enhance error logging and monitoring

## Contributors
- Muskan Arya - muskan.arya@globallogic.com
- Insha Khan - insha.khan@globallogic.com
- Aashi Chaudhary - aashi.chaudhary@globallogic.com
- Sajal Satsangi - sajal.satsangi@globallogic.com
- N Shikhar - nakirekanti.shikhar@globallogic.com
- Nihal saran das duggirala - nihal.saran@globallogic.com

## License
