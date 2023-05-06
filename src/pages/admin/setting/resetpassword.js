import { useEffect, useState } from 'react'
import axios from 'axios'
import jwt from 'jsonwebtoken'

const Resetpassword = () => {
  const [id, setId] = useState('')
  const [currentPassword, setCurrentPassword] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [newConfirmPassword, setNewConfirmPassword] = useState('')
  const [message, setMessage] = useState('')

  
  useEffect(() => {
    const token = localStorage.getItem('token')
    if (token) {
      const decodedToken = jwt.decode(token)
      setId(decodedToken.id)
    }
  }, [])

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (newPassword !== newConfirmPassword) {
      setMessage('Passwords do not match')
      return
    }

    try {
      const response = await axios.post('/api/auth/change-password', {
        id,
        currentPassword,
        newPassword,
        newConfirmPassword,
      })

      setMessage(response.data.message)
    } catch (error) {
      setMessage(error.response.data.message)
    }
  }



  return (

    <div className="relative flex flex-col justify-center min-h-screen overflow-hidden">
      <div className="w-full p-6 m-auto bg-white rounded-md shadow-xl lg:max-w-xl">
        <h1 className="text-3xl font-semibold text-center text-purple-700 uppercase">
          Change Password
        </h1>
        <form onSubmit={handleSubmit} className="mt-6">
          <div className="mb-2">
            <label
              htmlFor="current-password"
              className="block text-sm font-semibold text-gray-800"
            >
              current Password
            </label>
            <input
               type="password"
               id="current-password"
               value={currentPassword}
               onChange={(e) => setCurrentPassword(e.target.value)}
              className="block w-full px-4 py-2 mt-2 text-purple-700 bg-white border rounded-md focus:border-purple-400 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40"
            />
          </div>
          <div className="mb-2">
            <label
              htmlFor="new-password"
              className="block text-sm font-semibold text-gray-800"
            >
              new Password
            </label>
            <input
              type="password"
              id="new-password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              className="block w-full px-4 py-2 mt-2 text-purple-700 bg-white border rounded-md focus:border-purple-400 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40"
            />
          </div>
          <div className="mb-2">
            <label
              htmlFor="new-confirm-password"
              className="block text-sm font-semibold text-gray-800"
            >
              confirm Password
            </label>
            <input
              type="password"
              id="new-confirm-password"
              value={newConfirmPassword}
              onChange={(e) => setNewConfirmPassword(e.target.value)}
              className="block w-full px-4 py-2 mt-2 text-purple-700 bg-white border rounded-md focus:border-purple-400 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40"
            />
          </div>
          <div className="mt-6">
            <button type="submit" disabled={(!currentPassword,!newPassword,!newConfirmPassword)} className="w-full px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-purple-700 rounded-md hover:bg-purple-600 focus:outline-none focus:bg-purple-600 disabled:bg-purple-400">
              Change Confirm
            </button>
          </div>

          <div className='font-semibold pt-2'>
          {message && (
        <div
          className={`${
            message.includes('successfully') ? 'bg-green-100 text-green-900' : 'bg-red-100 text-red-900'
          } px-4 py-3 mb-4 rounded`}
          role="alert"
        >
          {message}
        </div>
      )}
          </div>
        </form>
      </div>
    </div>
  );
}


export default Resetpassword
