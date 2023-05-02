// import { useState, useEffect } from 'react';
// import jwt from 'jsonwebtoken';

// const Setting = () => {
//   const [token, setToken] = useState(null);
//   const [email, setEmail] = useState(null);
//   const [id, setId] = useState(null);

//   useEffect(() => {
//     const tokenFromLocalStorage = localStorage.getItem('token');
//     setToken(tokenFromLocalStorage);

//     // Decode the token
//     const decodedToken = jwt.decode(tokenFromLocalStorage);

//     // Set the email and id to the state of the component
//     setEmail(decodedToken.email);
//     setId(decodedToken.id);

//   }, []);
  
//   return (
//     <div>
//       {token}
//       <br />
//       <p>Email: {email}</p>
//       <p>ID: {id}</p>
//     </div>
//   )
// }

// export default Setting;



import Link from 'next/link'
import React from 'react'

const index = () => {
  return (
    <div>
      <Link href='setting/resetpassword'>
      Reset Password
      </Link>
    </div>
  )
}

export default index