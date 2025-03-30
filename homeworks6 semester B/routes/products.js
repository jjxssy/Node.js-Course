const express = require('express');
const router = express.Router();
const data = require('../data')
const path = require('path');

// GET /api/products
router.get('/', (req, res) => {
    res.json({ products: data.products });
});

// GET /api/products/:id
//get product by id (path param)
router.get('/:id', (req, res) => {
    const { id } = req.params;
    const product = data.products.find(item=>item.id===parseInt(id))
    if(product) res.json(product)
    else res.status(404).json({ message: `Product with ID: ${id} not found` });
});

// POST /api/products
// add product (body data)
router.post('/', (req, res) => {
    const prodData = req.body;
    const check = Number(prodData.price) > 0 && Number(prodData.stock) > 0;
    const result = data.products.find(item=>item.id===Number(prodData.id));
    if (result !== undefined || !check)
        res.status(400).json({ message: `Product could not be added` });
    else {
        data.products.push(prodData)
        res.json({ message: `Product added`, products: data.products });
    }
});

// PUT /api/products/:id
// update product by id (path param + body data)
router.put('/:id', (req, res) => {
    const { id } = req.params;
    const prodData = req.body;
    // find index of product by id into array 
    const prodInd = data.products.findIndex(item=>item.id===parseInt(id))
    const check = Number(prodData.price) > 0 && Number(prodData.stock) > 0;
    if(prodInd !== -1 && check){
        // change user into array
        data.products[prodInd] = prodData;
        res.json({ message: `Product with ID: ${id} updated`, products: data.products });
    }else{
        res.status(404).json({ message: `Product not found` })
    }
});

// DELETE /api/products
// delete product by id
router.delete('/:id', (req, res) => {
    const { id } = req.params;
    const prodInd = data.products.findIndex(item=>item.id===parseInt(id));
    if(prodInd !== -1){
        // delete product into array
        data.products.splice(prodInd, 1)
        res.json({ message: `Product with ID: ${id} deleted`, products: data.products });
    }else{
        res.status(404).json({ message: `Product not found` })
    }
});
module.exports = router;
