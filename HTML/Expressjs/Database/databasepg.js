//const http = require('./index.html');
const {Client} = require('pg');
const express = require('express');
const app = express();
const port = 3000;
//let weather = [];
//import {Client} from 'pg';

//app.use(express.json());


const client = new Client({
   host: "localhost",
   user: "postgres",
   port: 5432,
   password: "5s2zdphj",
   database: "postgres"
})


client.connect();
const getUsers = (request, response) => {
   client.query(`SELECT * FROM "Data".listusers`, (err, res)=> {
       if (err){
           console.log(err.message);
          
       }
       console.log(res.rows);
       response.status(200).json(res.rows);
  
       //client.end;
   })
}


const getUserByName = (request, response) => {
    const name = request.params.firstname;

    client.query('SELECT firstname FROM "Data".listusers', [firstname], (error, results) => {
       if (error){
           console.log(err.message);
       }
       response.status(200).json(res.rows);
    })
}

module.exports = {
   getUsers, getUserByName,
}

/*app.listen(port, ()=> {
   console.log(`Server is running on http://localhost:${port}`);
})*/
