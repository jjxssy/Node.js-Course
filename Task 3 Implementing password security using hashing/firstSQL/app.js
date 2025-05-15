const express = require('express');
const app = express();
const userRoutes = require('./routes/user')
const productsRoutes = require('./routes/products');
//const orderRoutes = require('./routes/order');
const port = 3000;

app.use(express.json());

app.use('/users', userRoutes);
app.use('/products', productsRoutes);
//app.use('/orders', orderRoutes);

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});