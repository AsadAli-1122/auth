// api/data/userdata.js

import { MongoClient } from 'mongodb';
import jwt from 'jsonwebtoken';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    // Get JWT token from local storage
    const token = req.headers.authorization.split(' ')[1];
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
    const userID = decodedToken.id;

    // Connect to MongoDB database
    const client = await MongoClient.connect(process.env.MONGODB_URI);
    const db = client.db(process.env.MONGODB_DB);

    // Get data from request body
    const { data } = req.body;

    // Check if data already exists for this user
    const existingData = await db
      .collection('UserData')
      .findOne({ userID: userID });

    if (existingData) {
      // Update existing data for this user
      const updatedData = {};
      for (const [key, value] of Object.entries(data)) {
        // If field exists in data and value is not null, update it
        if (value !== null && key in existingData.data) {
          updatedData[`data.${key}`] = value;
        }
        // If field exists in data but value is null, remove it
        else if (value === null && key in existingData.data) {
          updatedData[`data.${key}`] = undefined;
        }
        // If field doesn't exist in data, create it
        else {
          updatedData[`data.${key}`] = value;
        }
      }
      await db.collection('UserData').updateOne(
        { userID: userID },
        { $set: updatedData }
      );
    } else {
      // Insert new data for this user
      await db.collection('UserData').insertOne({
        userID: userID,
        data: data,
      });
    }

    res.status(200).json({ message: 'Data saved successfully' });
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
}
