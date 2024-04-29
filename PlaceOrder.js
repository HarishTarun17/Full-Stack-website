import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import './PlaceOrder.css';

function PlaceOrder() {
  const location = useLocation();
  const { cartItems } = location.state || {};
  const totalAmount = cartItems.reduce((acc, item) => acc + (item.price * item.quantity), 0);
  const [paymentMethod, setPaymentMethod] = useState('');
  const navigate = useNavigate();

  const handlePlaceOrder = async () => {
    if (!paymentMethod) {
      alert('Please select a payment method.');
      return;
    }

    try {
      const token = localStorage.getItem("token");
      const response = await axios.post('http://localhost:3000/api/orders', {
        cartItems: cartItems.map(item => ({
          product_id: item.id,
          quantity: item.quantity,
          price: item.price
        })),
        paymentMethod: paymentMethod
      }, {
        headers: { protector: token }
      });

      console.log('Order placed successfully:', response.data);
      navigate('/confirmation');
    } catch (error) {
      console.error('Error placing order:', error);
      alert('Error placing order. Please try again later.');
    }
  };

  return (
    <div className='place-order-container'>
      <h2>Place Order</h2>
      <div className="order-details">
        <h3>Items in Cart:</h3>
        {cartItems && cartItems.map((item) => (
          <div key={item.id} className="order-item">
            <p>{item.name} - Quantity: {item.quantity} - Price: ${item.price * item.quantity}</p>
          </div>
        ))}
        <div className="total-amount">Total Amount: ${totalAmount}</div>
      </div>
      <div className="payment-options">
        <h3>Select Payment Method:</h3>
        <select value={paymentMethod} onChange={(e) => setPaymentMethod(e.target.value)}>
          <option value="">Select Payment Method</option>
          <option value="credit_card">Credit Card</option>
          <option value="debit_card">Debit Card</option>
          <option value="paypal">PayPal</option>
        </select>
      </div>
      <div className='button-container'>
        <button onClick={handlePlaceOrder}>Place Order</button>
        <button onClick={() => navigate('/home')}>Go Back to Home</button>
      </div>
    </div>
  );
}

export default PlaceOrder;
