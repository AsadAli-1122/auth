// api/auth/login.js

import { MongoClient } from 'mongodb'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { email, password } = req.body

    // Connect to the MongoDB database
    const client = await MongoClient.connect(process.env.MONGODB_URI)
    const db = client.db(process.env.MONGODB_DB)

    // Check if the email exists in the database
    const user = await db.collection('Users').findOne({ email })
    if (!user) {
      res.status(400).json({ message: 'Invalid email or password' })
      return
    }

    // Compare the password with the hashed password in the database
    const passwordMatch = await bcrypt.compare(password, user.password)
    if (!passwordMatch) {
      res.status(400).json({ message: 'Invalid email or password' })
      return
    }

    // Create a JWT token for the user
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET)

    res.status(200).json({ message: 'Login successful', token , role:user.role })
  } else {
    res.status(405).json({ message: 'Method not allowed' })
  }
}
