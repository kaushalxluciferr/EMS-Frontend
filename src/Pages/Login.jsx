import React, { useState } from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Axios from 'axios';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  // console.log(email, password);

const navigate=useNavigate()

const {login}=useAuth()

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('https://employee-api-mu.vercel.app/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json', // Ensure the request has the correct headers
        },
        body: JSON.stringify({
          email,
          password,
        }),
      });
      
      if (!response.ok) {
        // Handle HTTP errors
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to login');
      }
      
      const data = await response.json(); // Parse the JSON response
      console.log(data); // Log the parsed data
     localStorage.setItem("token",data.token);
     login(data.user)
     if(data.user.role==='admin')
     {
navigate("/admin-dashboard")
     }
     else{
      navigate('/employee-dashboard')
     }
      toast.success('Login successful!')
     
    } catch (err) {
      console.error('Error:', err.message); // Log the error message
      toast.error(err.message || 'Something went wrong'); // Show meaningful error messages
    }
  };
  

  return (
    <div className='flex flex-col items-center h-screen justify-center bg-gradient-to-b from-teal-600 via-teal-500 to-gray-100 space-y-6'>
      <h2 className='font-sevillana text-3xl text-white'>Employee Management System</h2>
      <div className='border shadow-md rounded-lg p-6 w-80 bg-white'>
        <h2 className='text-2xl font-bold mb-4 text-center'>Login Here</h2>
        <form onSubmit={handleSubmit}>
          <div className='mb-4'>
            <label className='block text-gray-700' htmlFor='email'>Email</label>
            <input
              className='w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500'
              id='email'
              type='email'
              required
              placeholder='Enter Email'
              value={email} // Bind state to input
              onChange={(e) => setEmail(e.target.value)} // Update state
            />
          </div>
          <div className='mb-4'>
            <label className='block text-gray-700' htmlFor='password'>Password</label>
            <input
              className='w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500'
              id='password'
              required
              type='password'
              placeholder='Enter Password'
              value={password} // Bind state to input
              onChange={(e) => setPassword(e.target.value)} // Update state
            />
          </div>
          <div className='flex justify-between items-center mb-4'>
            <label className='inline-flex items-center'>
              <input type='checkbox' className='form-checkbox text-teal-600' />
              <span className='ml-2 text-gray-700'>Remember Me</span>
            </label>
            <a href='#' className='text-teal-600 hover:underline'>Forgot Password?</a>
          </div>
          <div className='mb-4'>
            <button
              type='submit'
              className='text-white py-2 w-full bg-teal-600 hover:bg-teal-700 rounded-md transition duration-200'
            >
              Login
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;
