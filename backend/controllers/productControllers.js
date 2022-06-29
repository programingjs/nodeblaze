const asyncHandler = require('express-async-handler')

const Product = require('../models/productModel')

// Get Products
// GET /api/products
// Public
const getProducts = asyncHandler(async(req, res) => {
    const products = await Product.find()
    
    res.status(200).json(products)
})

// Set Product
// POST /api/products
// Public
const setProduct = asyncHandler(async(req, res) => {
    if(!req.body.text){
        res.status(400)
        throw new Error('Please add a text field')
    }

    const product = await Product.create({
        text: req.body.text
    })

    res.status(200).json(product)
})

// Update Product
// PUT /api/products/:id
// Public
const updateProduct = asyncHandler(async(req, res) => {
    const product = await Product.findById(req.params.id)

    if(!product){
        res.status(400)
        throw new Error('Product not found')
    }

    const updatedProduct = await Product.findByIdAndUpdate(req.params.id, req.body, {
        new: true
    })

    res.status(200).json(updatedProduct)
})

// Delete Product
// DELETE /api/products/:id
// Public
const deleteProduct = asyncHandler(async(req, res) => {
    const product = await Product.findById(req.params.id)

    if(!product){
        res.status(400)
        throw new Error('Product not found')
    }

    await product.remove()

    res.status(200).json({id: req.params.id})
})

module.exports = {
    getProducts,
    setProduct,
    updateProduct,
    deleteProduct
}