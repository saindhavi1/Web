const { Pool } = require('pg');
const express = require('express');
const app = express();



const pool = new Pool({
  host: "localhost",
  user: "postgres",
  port: 5432,
  password: "5s2zdphj",
  database: "user"
})


//client.connect();
app.use(express.json());
const createTable = async(req, res) => {
  try {
    console.log("Inside the CreateTable step 22");
    const client = await pool.connect();
    await client.query(`
      CREATE TABLE IF NOT EXISTS user (
        id SERIAL PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        email VARCHAR(255) NOT NULL
      )
    `);
    console.log("Inside the CreateTable step 31");
    client.release();
    //res.status(200).send('Table created successfully.');
  } catch (err) {
    console.error('Error creating table:', err);
    res.status(500).send('An error occurred.');
  }
}


const insertRecord = async (req, res) => {
  console.log("Inside the insertRecord step 42");
  const { name, email } = req.body;
  // const name1 =req.body.name;
  try {
    const client = await pool.connect();
    await client.query('INSERT INTO "user" (name, email) VALUES ($1, $2)', [name, email]);
    client.release();
    //res.send('Record inserted successfully.');
  } catch (err) {
    console.error('Error inserting record:', err);
    res.status(500).send('An error occurred.');
  }
}


module.exports = {
  createTable, insertRecord
}


