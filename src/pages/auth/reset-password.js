import { useState } from 'react'
import { useRouter } from 'next/router'
import axios from 'axios'

function ResetPasswordPage() {
    const [newPassword, setNewPassword] = useState('')
    const [confirmNewPassword, setConfirmNewPassword] = useState('')
    const [message, setMessage] = useState('')
    const router = useRouter()
    const { token } = router.query

    const handleNewPasswordChange = (event) => {
        setNewPassword(event.target.value)
    }

    const handleConfirmNewPasswordChange = (event) => {
        setConfirmNewPassword(event.target.value)
    }

    const handleSubmit = async (event) => {
        event.preventDefault()

        try {
            const response = await axios.post(`/api/auth/reset-password?token=${token}`, {
                newPassword,
                confirmNewPassword
            })

            setMessage(response.data.message)
            router.push('/auth/login')
        } catch (error) {
            setMessage(error.response.data.message)
        }
    }

    return (
        <div className="relative flex flex-col justify-center min-h-screen overflow-hidden">
            <div className="w-full p-6 m-auto bg-white rounded-md shadow-xl lg:max-w-xl">
                <h1 className="text-3xl font-semibold text-center text-purple-700 uppercase">
                    Reset Password
                </h1>
                <form onSubmit={handleSubmit} className="mt-6">
                    <div className="mb-2">
                        <label
                            htmlFor="new-password"
                            className="block text-sm font-semibold text-gray-800"
                        >
                            New Password
                        </label>
                        <input
                            type="password"
                            id="new-password"
                            value={newPassword}
                            onChange={handleNewPasswordChange} className="block w-full px-4 py-2 mt-2 text-purple-700 bg-white border rounded-md focus:border-purple-400 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40"
                        />
                    </div>
                    <div className="mb-2">
                        <label
                            htmlFor="confirm-new-password"
                            className="block text-sm font-semibold text-gray-800"
                        >
                            Confirm New Password
                        </label>
                        <input
                             type="password"
                             id="confirm-new-password"
                             value={confirmNewPassword}
                             onChange={handleConfirmNewPasswordChange} className="block w-full px-4 py-2 mt-2 text-purple-700 bg-white border rounded-md focus:border-purple-400 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40"
                        />
                    </div>
                    <div className="mt-6">
                        <button type="submit" disabled={(!newPassword, !confirmNewPassword)} className="w-full px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-purple-700 rounded-md hover:bg-purple-600 focus:outline-none focus:bg-purple-600 disabled:bg-purple-400">
                            Reset Password
                        </button>
                    </div>

                    <div className='font-semibold pt-2'>
                        {message && <div className="text-center text-sm text-red-600">{message}</div>}
                    </div>
                </form>
            </div>
        </div>
    )
}

export default ResetPasswordPage
