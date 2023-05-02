import React, { useEffect, useState } from 'react';
import Layout from '../../components/layout/layout';

const Home = () => {
  const [data, setData] = useState('')
  const [token, setToken] = useState('')
  
  useEffect(() => {
    const token = localStorage.getItem('token');
    setToken(token);
    // console.log(token)
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault()

    try {
      const response = await fetch('/api/data/userdata', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ data, token }),
      })

      const { message } = await response.json()

      alert(message)
    } catch (error) {
      alert(error.message)
    }
  }


  return (
    <div>
      <Layout>
        <h1 className='text-center text-4xl'>Home</h1>
        {/* {token && <p>Token: {token}</p>} */}
        <form onSubmit={handleSubmit}>
      <label>
        Data:
        <input type="text" value={data} onChange={(event) => setData(event.target.value)} />
      </label>
      
      <button type="submit">Submit</button>
    </form>
      </Layout>
    </div>
  );
};

export default Home;
