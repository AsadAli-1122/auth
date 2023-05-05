import { MongoClient } from 'mongodb'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { username, email, password, confirmPassword } = req.body

    // Check if the password and confirm password fields match
    if (password !== confirmPassword) {
      res.status(400).json({ message: 'Passwords do not match' })
      return
    }

    // Connect to the MongoDB database
    const client = await MongoClient.connect(process.env.MONGODB_URI)
    const db = client.db(process.env.MONGODB_DB)

    // Check if the username or email already exists in the database
    const existingUser = await db.collection('Users').findOne({ $or: [{ username }, { email }] })
    if (existingUser) {
      res.status(400).json({ message: 'Username or E-mail already exists' })
      return
    }

    // Hash the password using bcrypt
    const hashedPassword = await bcrypt.hash(password, 10)

    // Insert the registration data into the "Users" collection, including the hashed password
    const result = await db.collection('Users').insertOne({
      username,
      email,
      password: hashedPassword,
      createdAt: new Date(),
      role: 'client'
    })
    // Insert a new user details document with null values data
    await db.collection('UserData').insertOne({
      userID: result.insertedId.toString(),
      data: {
        username: username,
        email: email
      }
    })

    // Create a JWT token with the user's email and ID
    const token = jwt.sign({ email, id: result.insertedId }, process.env.JWT_SECRET)

    res.status(200).json({ message: 'Registration successful', token })
  } else {
    res.status(405).json({ message: 'Method not allowed' })
  }
}
