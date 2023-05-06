import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import LayoutClient from '../../components/layout/layoutclient'

export default function ClientPage() {
  const [user, setUser] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      // Redirect user to login page if not logged in
      router.push('/auth/login');
      return;
    }

    fetch('/api/auth/user', {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
      .then(response => {
        if (!response.ok) throw new Error(response.statusText);
        return response.json();
      })
      .then(data => setUser(data))
      .catch(error => {
        console.error(error);
        // Redirect user to login page if unauthorized or user not found
        router.push('/auth/login');
      });
  }, []);

  if (!user) return <p>Loading...</p>;

  if (user.role === 'admin') {
    // Redirect admin users to admin page
    router.push('/admin');
    return null;
  }

  return (
    <>
    <LayoutClient userRole='client'>

    <div>
      <h1>Client Page</h1>
      <p>Welcome {user.username}!</p>
    </div>
    </LayoutClient>
    </>
  );
}
