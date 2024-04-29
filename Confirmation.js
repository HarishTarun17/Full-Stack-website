import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Confirmation.css'; // Import the CSS file for styling

function ConfirmationPage() {
  const navigate = useNavigate();

  return (
    <div className="confirmation-container">
      <div>
        <h2>Order Confirmation</h2>
        <p>Your order has been placed successfully!</p>
      </div>
      <button onClick={() => navigate('/home')}>Go Back to Home</button>
    </div>
  );
}

export default ConfirmationPage;
