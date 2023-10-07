const express = require('express');
const router = express.Router();
const { getAllProducts, addProduct, deleteProduct, updateProductById }= require("../controllers/products.controller.js");

router.get('/all',getAllProducts);
router.post('/add', addProduct);
router.delete('/remove', deleteProduct);
router.put('/update', updateProductById);

module.exports= router;