const express = require('express');
const { Pool } = require('pg');

const app = express();
const port = 4000;

// Create a connection pool
const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'postgres',
  password: 'siva',
  port: 5432,
});

// Middleware for parsing JSON bodies
app.use(express.json());

// Create a table (execute only once)
app.get('/createTable', async (req, res) => {
  try {
    console.log("Inside the CreateTable step 22");
    const client = await pool.connect();
    await client.query(`
      CREATE TABLE IF NOT EXISTS personal (
        id SERIAL PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        age INT
      )
    `);
    console.log("Inside the CreateTable step 31");
    client.release();
    res.status(200).send('Table created successfully.');
  } catch (err) {
    console.error('Error creating table:', err);
    res.status(500).send('An error occurred.');
  }
});

// Insert a record
app.post('/insertRecord', async (req, res) => {
  console.log("Inside the insertRecord step 42");
  const { name, age } = req.body;
 // const name1 =req.body.name;
  try {
    const client = await pool.connect();
    await client.query('INSERT INTO personal (name, age) VALUES ($1, $2)', [name, age]);
    client.release();
    res.send('Record inserted successfully.');
  } catch (err) {
    console.error('Error inserting record:', err);
    res.status(500).send('An error occurred.');
  }
});

// Select a single record
app.get('/selectRecord/:id', async (req, res) => {
  const id = req.params.id;
  try {
    const client = await pool.connect();
    const result = await client.query('SELECT * FROM personal WHERE id = $1', [id]);
    client.release();
    res.json(result.rows[0]);
  } catch (err) {
    console.error('Error selecting record:', err);
    res.status(500).send('An error occurred.');
  }
});

// Update a row
app.put('/updateRecord/:id', async (req, res) => {
  const id = req.params.id;
  const { name, age } = req.body;
  try {
    const client = await pool.connect();
    await client.query('UPDATE personal SET name = $1, age = $2 WHERE id = $3', [name, age, id]);
    client.release();
    res.send('Record updated successfully.');
  } catch (err) {
    console.error('Error updating record:', err);
    res.status(500).send('An error occurred.');
  }
});

// Delete a row
app.delete('/deleteRecord/:id', async (req, res) => {
  const id = req.params.id;
  try {
    const client = await pool.connect();
    await client.query('DELETE FROM personal WHERE id = $1', [id]);
    client.release();
    res.send('Record deleted successfully.');
  } catch (err) {
    console.error('Error deleting record:', err);
    res.status(500).send('An error occurred.');
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
