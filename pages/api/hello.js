export default function handler(req, res) {
    if (req.method === 'GET') {
      res.status(200).json({ message: 'Hello World' });
    } else if (req.method === 'POST') {
      const { input } = req.body;
      res.status(200).json({ message: input });
    }
  }
  