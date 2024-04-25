const express = require('express');
const bodyParser = require('body-parser');
const { Pool } = require('pg');
const cors = require('cors');

const app = express();
const port = 3000;

app.use(cors());

const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'ZitharaTask',
  password: 'qwert',
  port: 5432,
});

app.use(bodyParser.json());


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



app.post('/api/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const query = 'SELECT * FROM customer WHERE email = $1 AND password = $2';
    const values = [email, password];
    const result = await pool.query(query, values);
    if (result.rows.length > 0) {
      res.status(200).send('Login successful');
    } else {
      res.status(401).send('Invalid email or password');
    }
  } catch (error) {
    console.error('Error logging in:', error);
    res.status(500).send('Error logging in');
  }
});



app.get('/api/products', async (req, res) => {
  try {
    const products = await pool.query('SELECT * FROM products');
    
    res.json(products.rows);
  } catch (error) {
    console.error('Error fetching products:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});



app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
