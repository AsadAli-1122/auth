// dashboard/user-details.js

import { useState } from 'react';
import { useRouter } from 'next/router';
import Layout from '../../components/layout/layoutclient';

export default function UserDataForm() {
  const [userData, setUserData] = useState({
    firstName: '',
    lastName: '',
    age: '',
    phoneNumber: '',
    address: ''
  });
  const [status, setStatus] = useState(null);
  const router = useRouter();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserData(prevData => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    const response = await fetch('/api/data/userdata', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({ data: userData })
    });
    // const data = await response.json();
    if (response.ok) {
      setStatus('success');
      setTimeout(() => {
        router.push('/dashboard/home');
      }, 3000);
    } else {
      setStatus('error');
    }
  };

  return (
    <>
    <Layout>
    <form onSubmit={handleSubmit}>
      <label>
        First Name:
        <input
          type="text"
          name="firstName"
          value={userData.firstName}
          onChange={handleInputChange}
        />
      </label>
      <br />
      <label>
        Last Name:
        <input
          type="text"
          name="lastName"
          value={userData.lastName}
          onChange={handleInputChange}
        />
      </label>
      <br />
      <label>
        Age:
        <input
          type="number"
          name="age"
          value={userData.age}
          onChange={handleInputChange}
        />
      </label>
      <br />
      <label>
        Phone Number:
        <input
          type="tel"
          name="phoneNumber"
          value={userData.phoneNumber}
          onChange={handleInputChange}
        />
      </label>
      <br />
      <label>
        Address:
        <textarea
          name="address"
          value={userData.address}
          onChange={handleInputChange}
        />
      </label>
      <br />
      <button type="submit">Save Data</button>
      {status === 'success' && (
        <span style={{ color: 'green' }}>Data saved successfully</span>
      )}
      {status === 'error' && (
        <span style={{ color: 'red' }}>Error occurred while saving data</span>
      )}
    </form>
    </Layout>
    </>
  );
}
