import { useEffect, useState } from 'react';
import Layout from '../../components/layout/layout';
import { useRouter } from 'next/router';

async function getUserData() {
  try {
    const res = await fetch('/api/data/getuserdata', {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
    });
    const data = await res.json();
    return data;
  } catch (error) {
    console.error(error);
    return null;
  }
}

async function saveUserData(data) {
  try {
    const res = await fetch('/api/data/saveuserdata', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
      body: JSON.stringify(data),
    });
    const result = await res.json();
    return result;
  } catch (error) {
    console.error(error);
    return null;
  }
}

export default function UserData() {
  const router = useRouter();
  const [data, setData] = useState(null);

  async function fetchData() {
    const userData = await getUserData();
    setData(userData);
  }

  useEffect(() => {
    fetchData();
  }, []);

  async function handleSubmit(event) {
    event.preventDefault();
    const formData = new FormData(event.target);
    const username = formData.get('username');
    const email = formData.get('email');
    const firstName = formData.get('firstName');
    const lastName = formData.get('lastName');
    const result = await saveUserData({ username, email, firstName, lastName });
    if (result) {
      fetchData();
      // alert('Data saved successfully');
      router.push('/dashboard/home')

    } else {
      alert('Failed to save data');
    }
  }

  if (!data) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <Layout>
        <form onSubmit={handleSubmit}>
          <label className='hidden'>
            User Name :
            <input type="text" name="username" className='hidden' defaultValue={data.username}/>
          </label>
          <label className='hidden'>
            Email :
            <input type="email" name="email" className='hidden' defaultValue={data.email}/>
          </label>
          <label>
            First Name :
            <input type="text" name="firstName" defaultValue={data.firstName} />
          </label>
          <label>
            Last Name :
            <input type="text" name="lastName" defaultValue={data.lastName} />
          </label>
          <button type="submit">Save</button>
        </form>
      </Layout>
    </>
  );
}
