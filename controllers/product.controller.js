const Product = require('../models/product.model');
const logger = require('../logger/logger');

exports.findAll = async (req, res) => {
    console.log("Find All Products");

    try {
        const result = await Product.find({});
        res.status(200).json({status: true, data: result});
        console.log("Success finding all products")
        logger.info("Log info: Success in finding all users");
    } catch (err) {
        res.status(400).json({status: false, data: err})
        console.log("Problem finding all users");
        logger.error("Problem in finding all users");
    }
}

exports.findOne = async (req, res) => {
    const product = req.params.product;
    console.log("Find product: ", product);
    
    try {
        const result = await Product.findOne({ product: product });
        res.status(200).json({status: true, data: result});
        console.log("Success finding product: ", product);
        logger.info("Log info: Success finding product: ", product);
    } catch (err) {
        res.status(400).json({status: false, data: err})
        console.log("Problem finding product: ", product);
        logger.error("Problem finding product: ", product);
    }
}

exports.create = async (req, res) => {
    console.log("Posting new Product: ", req.body.product);

    const newProduct = new Product({
        product: req.body.product,
        cost: req.body.cost,
        description: req.body.description,
        quantity: req.body.quantity
    });

    try {
        const result = newProduct.save();
        res.status(200).json({status: true, data: result});
        console.log("Success posting new product");
        logger.info("Log info: posting new product");
    } catch (err) {
        res.status(400).json({status: false, data: err});
        console.log("Problem posting new product");
        logger.error("Problem posting new product");
    }
}