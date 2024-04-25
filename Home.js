import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Cart from './cart';
import './Home.css';

function Home() {
  const [products, setProducts] = useState([]);
  const [cartItems, setCartItems] = useState([]);
  const [showCart, setShowCart] = useState(false);
  const [notification, setNotification] = useState(null);

  const navigate = useNavigate();


  useEffect(() => {
    fetchProducts();
  }, []);

  useEffect(() => {
    // Calculate total amount
    const total = cartItems.reduce((acc, item) => acc + (item.price * item.quantity), 0);
    console.log('Total amount:', total);
  }, [cartItems]);

  const fetchProducts = async () => {
    try {
      const response = await axios.get('http://localhost:3000/api/products');
      setProducts(response.data);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  const addToCart = (product) => {
    const existingItem = cartItems.find((item) => item.id === product.product_id);

    if (existingItem) {
      const updatedItems = cartItems.map((item) =>
        item.id === product.product_id ? { ...item, quantity: item.quantity + 1 } : item
      );
      setCartItems(updatedItems);
    } else {
      const newItem = { id: product.product_id, name: product.product_name, price: product.price, quantity: 1 };
      setCartItems([...cartItems, newItem]);
    }
    setNotification(`${product.product_name} added to cart 🎉`);
    setTimeout(() => {
      setNotification(null);
    }, 3000);
  };

  const handleMinus = (itemId) => {
    const updatedItems = cartItems.map((item) =>
      item.id === itemId ? { ...item, quantity: item.quantity - 1 } : item
    ).filter((item) => item.quantity > 0);
    setCartItems(updatedItems);
  };

  const handleClick=()=>{
    navigate('/login');
  }

  return (
    <div>
      <h2>Products</h2>
      <div className={`notification ${notification && 'show'}`}>{notification}</div>
      <button className='logOut' onClick={handleClick}>Log out</button>
      <div className="product-list">
        {products.map((product) => (
          <div key={product.product_id} className="product-item">
            <h3>{product.product_name}</h3>
            <p>Price: ${product.price}</p>
            <button onClick={() => addToCart(product)}>Add to Cart</button>
          </div>
        ))}
      </div>
      <button className='cartB' onClick={() => setShowCart(!showCart)}>Cart</button>
      {showCart && <Cart cartItems={cartItems} handleMinus={handleMinus} />}
    </div>
  );
}

export default Home;
