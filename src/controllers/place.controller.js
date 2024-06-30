const axios = require('axios');
const GOOGLE_API_KEY = process.env.GOOGLE_API_KEY; // Ensure this is securely stored and not hard-coded in production
const Place = require('../models/Result'); // Adjust the path as necessary

exports.getAllResults = async (req, res) => {
    try {
        const results = await Place.find({}, 'placeName'); // Corrected to use a model
        const placeDetails = await Promise.all(results.map(async (result) => {
            const placeName = result.placeName;
            // Modified API request to include formatted_address in the fields
            const placesResponse = await axios.get(`https://maps.googleapis.com/maps/api/place/findplacefromtext/json?input=${encodeURIComponent(placeName)}&inputtype=textquery&fields=photos,formatted_address&key=${GOOGLE_API_KEY}`);
            const firstPlace = placesResponse.data.candidates[0];
            if (firstPlace) {
                const photoReference = firstPlace.photos && firstPlace.photos.length > 0 ? firstPlace.photos[0].photo_reference : null;
                // Construct URL for the first photo of the place if available
                const imageUrl = photoReference ? `https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=${photoReference}&key=${GOOGLE_API_KEY}` : null;
                // Extract the full location name
                const location = firstPlace.formatted_address;
                return { placeName, imageUrl, location: location };
            } else {
                return { placeName, imageUrl: null, location: null };
            }
        }));
        res.json(placeDetails);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching results', error: error.message });
    }
};