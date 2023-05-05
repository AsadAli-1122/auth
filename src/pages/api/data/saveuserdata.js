// api/data/saveuserdata.js

import { MongoClient } from 'mongodb';
import jwt from 'jsonwebtoken';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    try {
      // Get JWT token from authorization header
      const token = req.headers.authorization.split(' ')[1];
      
      // Verify token and extract id
      const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
      const userID = decodedToken.id;

      // Connect to MongoDB database
      const client = await MongoClient.connect(process.env.MONGODB_URI);
      const db = client.db(process.env.MONGODB_DB);

      // Get user data from request body
      const { username, firstName, lastName, email } = req.body;

      // Update or insert user data in database
      const result = await db.collection('UserData').updateOne(
        { userID },
        { $set: { data: { username, firstName, lastName, email } } },
        { upsert: true }
      );

      if (result.modifiedCount || result.upsertedCount) {
        res.status(200).json({ message: 'Data saved successfully' });
      } else {
        res.status(500).json({ message: 'Failed to save data' });
      }
    } catch (error) {
      // Return error if token is invalid or database connection fails
      console.error(error);
      res.status(500).json({ message: 'Server error' });
    }
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
}

