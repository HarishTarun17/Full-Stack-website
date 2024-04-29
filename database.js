const express = require('express');
const bodyParser = require('body-parser');
const { Pool } = require('pg');
const cors = require('cors');
const jwt=require('jsonwebtoken');
const { get } = require('firebase/database');
const { queryByRole } = require('@testing-library/react');

const app = express();
const port = 3000;

app.use(cors());
app.use(bodyParser.json());

const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'ZitharaTask',
  password: 'qwert',
  port: 5432,
});

async function getOrderID(customerID, productID) {
  const query = `
    SELECT order_id
    FROM orderdetails
    WHERE customer_id = $1 AND product_id = $2;
  `;
  const values = [customerID, productID];
  const result = await pool.query(query, values);
  return result.rows.length > 0 ? result.rows[0].order_id : null;
}

app.post('/api/signup', async (req, res) => {
  try {
    const { name, phoneNo, age, email, password } = req.body;
    const query = 'INSERT INTO customer (name, phone_no, age, email, password) VALUES ($1, $2, $3, $4, $5)';
    const values = [name, phoneNo, age, email, password];
    await pool.query(query, values);
    res.status(200).send('Customer signed up successfully');
  } catch (error) {
    console.error('Error inserting customer:', error);
    res.status(500).send('Error signing up');
  }
});

// Endpoint to handle customer login
app.post('/api/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const query = 'SELECT * FROM customer WHERE email = $1 AND password = $2';
    const values = [email, password];
    const result = await pool.query(query, values);
    if (result.rows.length > 0) {
    //  return res.send(result)
     const token=jwt.sign({customerId:result.rows[0].customer_id},"qwert")
      res.status(200).send({message:'Login successful',token});

    } else {
      res.status(401).send('Invalid email or password');
    }
  } catch (error) {
    console.error('Error logging in:', error);
    res.status(500).send('Error logging in');
  }
});

// Endpoint to fetch products
app.get('/api/products', async (req, res) => {
  try {
    const products = await pool.query('SELECT * FROM products');
    res.json(products.rows);
  } catch (error) {
    console.error('Error fetching products:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});


app.post('/api/orders', async (req, res) => {
  const { cartItems } = req.body;
  const { protector } = req.headers;

  if (!protector) {
    return res.status(401).json({ message: "Token not provided" });
  }

  try {
    const token = jwt.verify(protector, "qwert");
    const transactionDate = new Date().toISOString();

    await Promise.all(cartItems.map(async (item) => {
      const { product_id, quantity, price } = item;

      // Retrieve or create the order_id based on customer_id and product_id
      let orderID = await getOrderID(token.customerId, product_id);

      if (!orderID) {
        const queryText = `
          INSERT INTO orderdetails (customer_id, product_id, quantity, total_price)
          VALUES ($1, $2, $3, $4)
          RETURNING order_id;
        `;
        const orderResult = await pool.query(queryText, [token.customerId, product_id, quantity, price * quantity]);
        orderID = orderResult.rows[0].order_id;
      }
      
      console.log(orderID, transactionDate, req.body.paymentMethod);
      const transactionQuery = `
        INSERT INTO transactiondetails (order_id, transaction_date, payment_method)
        OVERRIDING SYSTEM VALUE
        VALUES ($1, $2, $3);
      `;
      await pool.query(transactionQuery, [orderID, transactionDate, req.body.paymentMethod]);
    }));

    res.status(201).json({ message: 'Order placed successfully' });
  } catch (error) {
    console.error('Error placing order:', error);
    res.status(500).json({ error: 'Failed to place order' });
  }
});



app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
