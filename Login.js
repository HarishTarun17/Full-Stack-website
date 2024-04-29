import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './Login.css'

function LoginPage() {
  const [formData, setFormData] = useState({
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
      const resp=await axios.post('http://localhost:3000/api/login', formData);
      console.log(resp.data)
      localStorage.setItem("token",resp.data.token)
      navigate('/home');
    } catch (error) {
      console.error('Error:', error);
      window.alert("Your entered a wrong Email or a Password")
    }
  };

  return (
    <div className='loginForm'>
        <h2 className='loginHead'>Login</h2>
      <form onSubmit={handleSubmit}>
        <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="Email" required />
        <input type="password" name="password" value={formData.password} onChange={handleChange} placeholder="Password" required />
        <button type="submit">Login</button>
      </form>
    </div>
  );
}

export default LoginPage;
