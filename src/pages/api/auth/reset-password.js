import { MongoClient } from 'mongodb'
import bcrypt from 'bcrypt'

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { token } = req.query
    const { newPassword, confirmNewPassword } = req.body

    // Connect to the MongoDB database
    const client = await MongoClient.connect(process.env.MONGODB_URI)
    const db = client.db(process.env.MONGODB_DB)

    // Check if the token exists in the database
    const user = await db.collection('Users').findOne({ resetToken: token })
    if (!user) {
      res.status(400).json({ message: 'Invalid token' })
      return
    }

    // Verify that the new password and confirm new password match
    if (newPassword !== confirmNewPassword) {
      res.status(400).json({ message: 'Passwords do not match' })
      return
    }

    // Hash the password using bcrypt
    const hashedPassword = await bcrypt.hash(newPassword, 10)

    // Update the user's password in the database
    await db.collection('Users').updateOne(
      { _id: user._id },
      { $set: { password: hashedPassword }, $unset: { resetToken: 1 } }
    )
    
    res.status(200).json({ message: 'Password reset successful' })
  } else {
    res.status(405).json({ message: 'Method not allowed' })
  }
}
