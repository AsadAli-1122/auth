import { MongoClient } from 'mongodb'
import jwt from 'jsonwebtoken'
import nodemailer from 'nodemailer'

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { email } = req.body

    // Connect to the MongoDB database
    const client = await MongoClient.connect(process.env.MONGODB_URI)
    const db = client.db(process.env.MONGODB_DB)

    // Check if the email exists in the database
    const user = await db.collection('Users').findOne({ email })
    if (!user) {
      res.status(400).json({ message: 'Invalid email' })
      return
    }

    // Generate a password reset token
    const resetToken = jwt.sign({ email: user.email, id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' })

    // Update the user's password reset token in the database
    await db.collection('Users').updateOne({ _id: user._id }, { $set: { resetToken } })

    // Create a nodemailer transporter
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USERNAME,
        pass: process.env.EMAIL_PASSWORD
      }
    })

    // Define the email message
    const message = {
      from: process.env.EMAIL_USERNAME,
      to: user.email,
      subject: 'Password Reset Request',
      html: `<p>Dear ${user.name},</p><p>You have requested to reset your password. Please click on the following link to reset your password:</p><p><a href="${process.env.NEXT_PUBLIC_BASE_URL}/auth/reset-password?token=${resetToken}">Reset Password</a></p><p>If you did not request a password reset, please ignore this email.</p><p>Best regards,<br>Your App Team</p>`
    }

    // Send the email
    transporter.sendMail(message, (error, info) => {
      if (error) {
        console.log(error)
        res.status(500).json({ message: 'Error sending email' })
      } else {
        console.log(info)
        res.status(200).json({ message: 'Password reset email sent', resetToken })
      }
    })
  } else {
    res.status(405).json({ message: 'Method not allowed' })
  }
}
