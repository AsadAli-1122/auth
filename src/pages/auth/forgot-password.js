import React, { useState } from 'react';
import axios from 'axios';
import Link from 'next/link';

function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('/api/auth/forgot-password', { email });
      setMessage(response.data.message);
      setError('');
      setEmail('');
    } catch (error) {
      setError(error.response.data.message);
      setMessage('');
    }
  };
  

  return (
    <div className="relative flex flex-col justify-center min-h-screen overflow-hidden">
      <div className="w-full p-6 m-auto bg-white rounded-md shadow-xl lg:max-w-xl">
        <h1 className="text-3xl font-semibold text-center text-purple-700 uppercase">
          Forgot Password
        </h1>
        <form onSubmit={handleSubmit} className="mt-6">
          <div className="mb-2">
            <label
              htmlFor="email"
              className="block text-sm font-semibold text-gray-800"
            >
              Email
            </label>
            <input
              type="email" name="email" value={email} onChange={e => setEmail(e.target.value)}
              className="block w-full px-4 py-2 mt-2 text-purple-700 bg-white border rounded-md focus:border-purple-400 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40"
            />
          </div>
          <div className="mt-6">
            <button type="submit" disabled={(!email)} className="w-full px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-purple-700 rounded-md hover:bg-purple-600 focus:outline-none focus:bg-purple-600 disabled:bg-purple-400">
              Confirm Email
            </button>
          </div>

          <div className='font-semibold pt-2'>
            {error && <div className="text-center text-sm text-red-600">{error}</div>}
            {message && <div className="text-center text-sm text-green-600">{message}</div>}
          </div>
        </form>

        <p className="mt-8 text-gray-700">
          {" "}
          Don&apos;t have an account?{" "}
          <Link
            href="/auth/signup"
            className="font-medium text-purple-600 hover:underline"
          >
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
}

export default ForgotPassword;


