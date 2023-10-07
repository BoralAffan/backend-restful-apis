const express = require('express');
const fs = require('fs')
const router = express.Router();

exports.getAllProducts = async (req, res) => {
    fs.readFile("products.json", (err,data)=>{
    if(err) throw err;

    const productData = JSON.parse(data);

    return res.json({
        message: "data fetched successfully",
        productData
    });

});
}

exports.deleteProduct = async(req, res)=>{
    const { id:productId} = req.query;
console.log(productId)
    fs.readFile("products.json",(err,data)=>{
        if(err) throw err;
        let producsts= JSON.parse(data);
        var existingProducts = [...producsts]
        const filteredProducts = existingProducts.filter(
            (prod) => prod.id !== +productId
        );
        let productsData = JSON.stringify(filteredProducts);
        fs.writeFileSync("products.json", productsData);
        return res.status(201).json({
            message: "product deleted!",
            products: filteredProducts,
        });
    })
}

exports.updateProductById = async (req, res) => {
    const { id:productId } = req.query;
const {title, price}= req.body;
console.log(productId);
console.log(title);
console.log(price);
    fs.readFile("products.json", (err, data) => {
        if (err) throw err;
        let producsts = JSON.parse(data);
        var existingProducts = [...producsts]
        const productIndex = existingProducts.findIndex(
            (prod) => prod.id === +productId
        );
        console.log("index"+productIndex)
        if(productIndex!=-1){
            existingProducts[productIndex].title= title;
            existingProducts[productIndex].price= price;

        }
        let productsData = JSON.stringify(existingProducts);
        fs.writeFileSync("products.json", productsData);
        return res.status(201).json({
            message: "product updated!",
            products: existingProducts,
        });
    })
}

exports.addProduct = async(req,res) =>{
    const {title, price}= req.body;
    var newProduct = {
        "id": (Math.round(Math.random()*10)),
        "title": title,
        "price": price
    }
    
  fs.readFile("products.json",(err,data)=>{
    if(err) console.log(err);
      let product = JSON.parse(data);
      var existingProducts = [...product];
      existingProducts.push(newProduct);
     
      let productsData = JSON.stringify(existingProducts);
      fs.writeFileSync("products.json", productsData);
 return res.status(201).json({
    "message": "product added successfully",
     existingProducts
 })
  });
 
     
}