//api/auth/user.js

import { MongoClient, ObjectId } from 'mongodb';
import jwt from 'jsonwebtoken';

export default async function handler(req, res) {
  if (req.method === 'GET') {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
      res.status(401).json({ message: 'Unauthorized' });
      return;
    }

    try {
      const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
      const userId = decodedToken.id;
      const client = await MongoClient.connect(process.env.MONGODB_URI);
      const db = client.db(process.env.MONGODB_DB);
      const user = await db.collection('Users').findOne({ _id: new ObjectId(userId) });

      if (!user) {
        res.status(404).json({ message: 'User not found' });
        return;
      }

      res.status(200).json(user);
    } catch (error) {
      console.error(error);
      res.status(401).json({ message: 'Unauthorized' });
    }
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
}
