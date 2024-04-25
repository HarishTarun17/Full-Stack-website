import React from 'react';
import './cart.css';

function CartItem({ item, handleMinus }) {
  const handleMinusClick = () => {
    handleMinus(item.id);
  };

  return (
    <div className="cart-item">
      <div className="cart-item-details">
        <span>{item.name}</span>
        <span>Quantity: {item.quantity}</span>
        <span>Price: ${item.price * item.quantity}</span>
      </div>
      <button onClick={handleMinusClick}>-</button>
    </div>
  );
}

function Cart({ cartItems, handleMinus }) {
  const totalAmount = cartItems.reduce((acc, item) => acc + (item.price * item.quantity), 0);

  return (
    <div className="cart">
      <h2>Cart</h2>
      <div className="cart-items">
        {cartItems.map((item) => (
          item.quantity > 0 && (
            <CartItem key={item.id} item={item} handleMinus={handleMinus} />
          )
        ))}
      </div>
      <div className="cart-total">Total: ${totalAmount}</div>
    </div>
  );
}

export default Cart;
