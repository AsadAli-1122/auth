// api/data/userdata.js

import { MongoClient } from 'mongodb'
import jwt from 'jsonwebtoken'

export default async function handler(req, res) {
  if (req.method === 'POST') {
    
    const { data,token } = req.body

    try {
      // Verify the JWT token
      const decoded = jwt.verify(token, process.env.JWT_SECRET)
      const { email } = decoded


      // Connect to the MongoDB database
      const client = await MongoClient.connect(process.env.MONGODB_URI)
      const db = client.db(process.env.MONGODB_DB)

      // Insert the data into the "UserData" collection, associated with the user's email
      await db.collection('UserData').insertOne({ email, data })

      res.status(200).json({ message: 'Data saved successfully' })
    } catch (error) {
      res.status(401).json({ message: 'Unauthorized' })
    }
  } else {
    res.status(405).json({ message: 'Method not allowed' })
  }
}
