const axios = require('axios');

exports.searchGooglePlace = async (req, res) => {
  const { name, address, lat, lng } = req.query;
  const GOOGLE_API_KEY = process.env.GOOGLE_API_KEY; // Store this in your .env file
  console.log(GOOGLE_API_KEY)

  try {
    const encodedQuery = encodeURIComponent(`${address}`);
    const url = `https://maps.googleapis.com/maps/api/place/textsearch/json?query=${encodedQuery}&location=${lat},${lng}&key=${GOOGLE_API_KEY}`;

    const response = await axios.get(url);
    const result = response.data.results[0];

    if (!result) {
      return res.status(404).json({ error: 'No results found' });
    }

    res.json({
      name: result.name,
      lat: result.geometry.location.lat,
      lng: result.geometry.location.lng
    });
  } catch (error) {
    console.error('Error fetching Google place:', error);
    res.status(500).json({ error: 'Error fetching Google place' });
  }
};