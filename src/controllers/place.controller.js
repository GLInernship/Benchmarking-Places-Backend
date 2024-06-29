const axios = require('axios');
const GOOGLE_API_KEY = process.env.GOOGLE_API_KEY; // Ensure this is securely stored and not hard-coded in production
const Place = require('../models/Result'); // Adjust the path as necessary

exports.getAllResults = async (req, res) => {
    try {
        const results = await Place.find({}, 'placeName'); // Corrected to use a model
        const placeImages = await Promise.all(results.map(async (result) => {
            const placeName = result.placeName;
            // Use Google Places API to search for the place by name
            const placesResponse = await axios.get(`https://maps.googleapis.com/maps/api/place/findplacefromtext/json?input=${encodeURIComponent(placeName)}&inputtype=textquery&fields=photos&key=${GOOGLE_API_KEY}`);
            const firstPlace = placesResponse.data.candidates[0];
            if (firstPlace && firstPlace.photos && firstPlace.photos.length > 0) {
                const photoReference = firstPlace.photos[0].photo_reference;
                // Construct URL for the first photo of the place
                const imageUrl = `https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=${photoReference}&key=${GOOGLE_API_KEY}`;
                return { placeName, imageUrl };
            } else {
                return { placeName, imageUrl: null };
            }
        }));
        res.json(placeImages);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching results', error: error.message });
    }
};