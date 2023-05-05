import { useState, useEffect } from 'react';
// import useRouter from 'next/router';
import Layout from '../../components/layout/layout';

function UserData() {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  // const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem('token');
    // if (!token) {
    //   router.push('/login');
    //   return;
    // }

    // Fetch user data from API
    fetch('/api/data/getuserdata', {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
      .then(res => {
        if (!res.ok) {
          throw new Error('Failed to fetch user data');
        }
        return res.json();
      })
      .then(data => {
        setUserData(data);
        setLoading(false);
      })
      .catch(error => {
        setError(error.message);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  if (!userData) {
    return null;
  }

  return (
    <>
      <Layout>

        <div>
          <h1>User Data</h1>
          <p>username : {userData.username}</p>
          <p>email : {userData.email}</p>
          {userData.firstName && <p>First Name: {userData.firstName}</p>}
          {userData.lastName && <p>Last Name: {userData.lastName}</p>}
        </div>
      </Layout>
    </>
  );
}

export default UserData;
