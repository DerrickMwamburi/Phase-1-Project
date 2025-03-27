import Cors from 'cors';

// Initialize CORS
const cors = Cors({
  methods: ['GET', 'POST', 'PUT', 'DELETE'], // Define allowed HTTP methods
  allowedHeaders: ['Content-Type', 'Authorization'], // Define allowed headers (optional)
});

// Helper function to run CORS middleware
const runCors = (req, res) =>
  new Promise((resolve, reject) => {
    cors(req, res, (result) => {
      if (result instanceof Error) {
        reject(result);
      } else {
        resolve(result);
      }
    });
  });

export default async function handler(req, res) {
  try {
    // Run CORS before handling the request
    await runCors(req, res);

    // Handle the API logic based on the HTTP method
    if (req.method === 'GET') {
      // Get bookings logic here
      res.status(200).json({ message: 'Fetching bookings' });
    } else if (req.method === 'POST') {
      // Create booking logic here
      const newBooking = req.body;
      res.status(201).json({ message: 'Booking created', booking: newBooking });
    } else {
      // Handle other methods (PUT, DELETE)
      res.status(405).json({ message: 'Method Not Allowed' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
}
