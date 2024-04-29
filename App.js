import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import SignUpPage from './SignUpPage';
import LoginPage from './Login';
import HomePage from './Home';
import PlaceOrderPage from './PlaceOrder';
import ConfirmationPage from './Confirmation';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<SignUpPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/place-order" element={<PlaceOrderPage />} />
        <Route path="/confirmation" element={<ConfirmationPage />} />
      </Routes>
      
    </Router>
  );
}

export default App;
