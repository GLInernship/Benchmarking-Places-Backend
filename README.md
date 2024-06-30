# Benchmarking Places Backend

This repository contains the backend code for the Benchmarking Places project. It provides APIs for searching places, saving grid data, and managing nearby places and results using various services like Google Places API.

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [API Endpoints](#api-endpoints)
- [Environment Variables](#environment-variables)
- [Contributing](#contributing)
- [License](#license)

## Installation

1. Clone the repository:

   ```sh
   git clone https://github.com/your-username/benchmarking-places-backend.git
   cd benchmarking-places-backend
   ```

2. Install dependencies:

   ```sh
   npm install
   ```

3. Create a `.env` file in the root directory and add the following environment variables:

   ```env
   GOOGLE_API_KEY=your_google_api_key
   MONGODB_URI=your_mongodb_uri
   ```

4. Start the server:

   ```sh
   npm start
   ```

## Usage

### Middleware

- **Morgan**: Used for logging requests in the 'combined' format.
- **Cors**: Configured to allow requests from specific origins.

### Available Scripts

- `npm start`: Starts the server on the port specified in the `.env` file or defaults to port 3000.

## API Endpoints

### Google Place Controller

- **GET /api/search-google-place**

  Searches for a place using the Google Places API.

  **Query Parameters:**
  - `name`: Name of the place.
  - `address`: Address of the place.
  - `lat`: Latitude.
  - `lng`: Longitude.

  **Response:**
  ```json
  {
    "name": "Place Name",
    "lat": 123.456,
    "lng": 78.910
  }
  ```

### Grid Data Controller

- **POST /api/grid-data**

  Saves grid data.

  **Request Body:**
  ```json
  {
    "placeName": "Place Name",
    "gridData": [
      {
        "subregion_id": "Subregion ID",
        "bounds": { ... },
        "center": { ... },
        "ranLatLonss": { ... }
      }
    ]
  }
  ```

  **Response:**
  ```json
  {
    "success": true,
    "message": "Grid data saved successfully",
    "data": { ... }
  }
  ```

- **GET /api/grid-data**

  Retrieves all grid data sorted by timestamp.

  **Response:**
  ```json
  {
    "success": true,
    "data": [ ... ]
  }
  ```

### Nearby Place Controller

- **POST /api/save-nearby-places**

  Saves nearby places data.

  **Request Body:**
  ```json
  {
    "groupedRLatLons": [ ... ],
    "placeType": { ... },
    "placeName": "Place Name",
    "resultLimit": "10",
    "searchRadius": "1000"
  }
  ```

  **Response:**
  ```json
  {
    "success": true,
    "message": "Nearby places data saved successfully",
    "data": { ... }
  }
  ```

### Result Controller

- **POST /api/save-results**

  Saves or updates results.

  **Request Body:**
  ```json
  {
    "placeName": "Place Name",
    "placeType": { ... },
    "results": [ ... ]
  }
  ```

  **Response:**
  ```json
  {
    "success": true,
    "message": "Results saved/updated successfully",
    "data": { ... }
  }
  ```

- **GET /api/get-results**

  Retrieves all results.

  **Response:**
  ```json
  {
    "success": true,
    "results": [ ... ]
  }
  ```

- **GET /api/place/:placeName**

  Retrieves details of a specific place by name.

  **Response:**
  ```json
  {
    "success": true,
    "placeDetails": { ... }
  }
  ```

## Environment Variables

Make sure to set up the following environment variables in your `.env` file:

- `GOOGLE_API_KEY`: Your Google API key.
- `MONGODB_URI`: MongoDB connection string.

## Contributing

Contributions are welcome! Please open an issue or submit a pull request for any changes.

