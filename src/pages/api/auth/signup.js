// api/auth/signup.js

import { MongoClient } from 'mongodb'
import bcrypt from 'bcrypt'

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { name, email, password, confirmPassword } = req.body

    // Check if the password and confirm password fields match
    if (password !== confirmPassword) {
      res.status(400).json({ message: 'Passwords do not match' })
      return
    }

    // Hash the password using bcrypt
    const hashedPassword = await bcrypt.hash(password, 10)

    // Connect to the MongoDB database
    const client = await MongoClient.connect(process.env.MONGODB_URI)
    const db = client.db(process.env.MONGODB_DB)

    // Check if the email already exists in the database
    const existingUser = await db.collection('Users').findOne({ email })
    if (existingUser) {
      res.status(400).json({ message: 'E-mail already exists' })
      return
    }

    // Insert the registration data into the "Users" collection, including the hashed password
    await db.collection('Users').insertOne({ name, email, password: hashedPassword, createdAt: new Date() })

    res.status(200).json({ message: 'Registration successful' })
  } else {
    res.status(405).json({ message: 'Method not allowed' })
  }
}
