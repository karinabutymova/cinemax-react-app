/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react'
import axios from 'axios';
import jwt_decode from "jwt-decode";
import { useNavigate  } from 'react-router-dom';
 
const ProfilePage = () => {
   const navigate = useNavigate();
   const [name, setName] = useState('');
   const [token, setToken] = useState('');
   const [expire, setExpire] = useState('');
   const [users, setUsers] = useState([]);

   useEffect(() => {
      refreshToken();
      getUsers();
   }, []);

   const refreshToken = async () => {
      try {
         const response = await axios.get('http://localhost:3001/token',
             {withCredentials: true }  
          );
         setToken(response.data.accessToken);
         const decoded = jwt_decode(response.data.accessToken);
         setName(decoded.name);
         setExpire(decoded.exp);
      } catch (error) {
         if (error.response) {
            navigate("/auth");
         }
      }
   }

   const axiosJWT = axios.create( {withCredentials: true });

   axiosJWT.interceptors.request.use(async (config) => {
      const currentDate = new Date();
      if (expire * 1000 < currentDate.getTime()) {
         const response = await axios.get('http://localhost:3001/token',
             {withCredentials: true }
          );
         config.headers.Authorization = `Bearer ${response.data.accessToken}`;
         setToken(response.data.accessToken);
         const decoded = jwt_decode(response.data.accessToken);
         setName(decoded.name);
         setExpire(decoded.exp);
      }
      return config;
   }, (error) => {
      return Promise.reject(error);
   });

   const getUsers = async () => {
      try {
         const response = await axiosJWT.get('http://localhost:3001/users', {
            headers: {
               Authorization: `Bearer ${token}`,
            }
         });
         setUsers(response.data);
      } catch (error) {
         if (error.response) {
            console.log(error.response);
         }
      }

   }
 
    const Logout = async () => {
        try {
            await axios.delete('http://localhost:3001/logout', { withCredentials: true });
            navigate("/auth");
        } catch (error) {
            console.log(error);
        }
    }

   return (
      <div className="container mt-5">
         <h1>Welcome Back: {name}</h1>
         <table className="table is-striped is-fullwidth">
               <thead>
                  <tr>
                     <th>No</th>
                     <th>Name</th>
                     <th>Email</th>
                  </tr>
               </thead>
               <tbody>
                  {users.map((user, index) => (
                     <tr key={user.id}>
                           <td>{index + 1}</td>
                           <td>{user.name}</td>
                           <td>{user.email}</td>
                           <td>{user.role}</td>
                     </tr>
                  ))}

               </tbody>
         </table>

         <button onClick={Logout} className="button is-light">
            Log Out
         </button>
      </div>
   )
}
 
export default ProfilePage