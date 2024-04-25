import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './App.css'

function SignUpPage() {
  const [formData, setFormData] = useState({
    name: '',
    phoneNo: '',
    age: '',
    email: '',
    password: ''
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:3000/api/signup', formData);
      navigate('/login');
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleClick=()=>{
    navigate('/login');
  }

  return (
    <div className='SignupForm'>
      <h2 className='SignupHead'>Sign Up</h2>
      <form onSubmit={handleSubmit}>
        <input type="text" name="name" value={formData.name} onChange={handleChange} placeholder="Name" required />
        <input type="text" name="phoneNo" value={formData.phoneNo} onChange={handleChange} placeholder="Phone Number" required />
        <input type="number" name="age" value={formData.age} onChange={handleChange} placeholder="Age" required />
        <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="Email" required />
        <input type="password" name="password" value={formData.password} onChange={handleChange} placeholder="Password" required />
        <button type="submit">Sign Up</button>
        <button onClick={handleClick} className='loginClick'>Login</button>
      </form>
    </div>
  );
}

export default SignUpPage;
