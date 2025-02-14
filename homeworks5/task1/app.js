const express = require('express');
const app = express();
const port = 3000;
const path = require('path');
const logger = require('./logger');
const fs = require('fs');

const productsData = JSON.parse(fs.readFileSync(__dirname + '/products.json'));
const usersData = JSON.parse(fs.readFileSync(__dirname + '/users.json'));
app.use(express.json());
console.log(usersData);

// get a single product by id
app.get('/products/:id', (req, res, next) =>{
  const id = req.params.id;
  const singleProduct = productsData.find(elem =>{
    return Number(id) === elem.id;
  });
  if(!singleProduct)
    return res.status(404).json();
  res.json(singleProduct);
});

// get all users' data that the specified age is bigger
app.get('/users/:age', (req, res, next) => {
  const age = req.params.age;
  const users = usersData.filter(elem => {
    return elem.age > Number(age);
  });
  res.send(users);
});


// read users
app.get('/users', (req, res, next) => {
  res.send(usersData);
});


// read products
app.get('/products', (req, res, next) =>{
  res.send(productsData);
});


app.use(logger);
app.use(express.static(path.join(__dirname, 'assets')));

// 404 error handler
app.use((req, res, next) => {
  res.status(404).sendFile(path.join(__dirname, 'assets', '404.html'));
});


app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});