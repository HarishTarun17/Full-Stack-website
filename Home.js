import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './Home.css';

function Home() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await axios.get('http://localhost:3000/api/products');
      setProducts(response.data);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  const navigate = useNavigate();

  const handleClick = () => {
    navigate('/login');
  };

  const handleOrderClick = (productId) => {
    // Navigate to order page with productId
    navigate(`/order/${productId}`);
  };

  return (
    <div className="productCart">
      <div className="nav">
        <h2>Products</h2>
        <button onClick={handleClick} className="logOut">
          Log out
        </button>
      </div>

      <div className="product-list">
        {products.map((product) => (
          <div key={product.product_id} className="product-item">
            <h3>{product.product_name}</h3>
            <p>Price: ${product.price}</p>
            <button onClick={() => handleOrderClick(product.product_id)}>Order</button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Home;
