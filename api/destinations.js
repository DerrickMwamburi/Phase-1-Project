import Cors from 'cors';

const cors = Cors({
  methods: ['GET'],
});

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
    await runCors(req, res);

    if (req.method === 'GET') {
      // Get destinations logic here
      res.status(200).json({ message: 'Fetching destinations' });
    } else {
      res.status(405).json({ message: 'Method Not Allowed' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
}
