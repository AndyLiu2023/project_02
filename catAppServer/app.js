require('dotenv').config();
const express = require('express');

const mysql = require('mysql2/promise');
const db = require('./data/database');


const app = express();

const mainRoute = require('./routes/main-route');

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use(mainRoute);



const connection =  mysql.createConnection(db);



connection.then(function(){
  app.listen(process.env.PORT);
  console.log('sever on!')
})
.catch(function (error) {
  console.log('Failed to connect to the database!');
  console.log(error);
});