// api/data/getuserdata.js

import { MongoClient } from 'mongodb';
import jwt from 'jsonwebtoken';

export default async function handler(req, res) {
  if (req.method === 'GET') {
    try {
      // Get JWT token from authorization header
      const token = req.headers.authorization.split(' ')[1];
      
      // Verify token and extract id
      const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
      const userID = decodedToken.id;

      // Connect to MongoDB database
      const client = await MongoClient.connect(process.env.MONGODB_URI);
      const db = client.db(process.env.MONGODB_DB);

      // Find user data in database
      const userData = await db.collection('UserData').findOne({ userID });

      if (userData) {
        // Return user data if found
        const data = userData.data;
        const filteredData = Object.keys(data)
          .filter(key => data[key] !== null && data[key] !== undefined)
          .reduce((obj, key) => {
            obj[key] = data[key];
            return obj;
          }, {});
        res.status(200).json(filteredData);
      } else {
        // Return error if user not found
        res.status(404).json({ message: 'User data not found' });
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
