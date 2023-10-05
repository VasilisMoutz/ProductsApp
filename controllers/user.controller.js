const User = require('../models/user.model');

const logger = require('../logger/logger')
exports.findAll = async(req, res) => {
    console.log("Find all users");

    try {
        const result = await User.find();
        res.status(200).json({status: true, data: result});
        console.log("Success in reading all users");
        logger.info("Log info: Success in reading all users");
        logger.error(">>> Problem in reading all users");
        // logger.log("Logger Success in reading all users")
    } catch(err) {
        res.status(400).json({status: false, data: err})
        logger.error("Problem in reading all users");
        console.log("Problem in reading all users");
    }
}

exports.findOne = async(req, res) => {
    const username = req.params.username;
    console.log("Find user with username: " + username);
    try {
        const result = await User.findOne({username: username})
        res.status(200).json({status: true, data: result});
    } catch (err) {
        res.status(400).json({status: false, data: err})
        console.log("Problem in reading username: " + username);
    }
}

exports.create = async(req, res) => {
    
    const newUser = new User({
        username: req.body.username,
        password: req.body.password,
        name: req.body.name,
        surname: req.body.surname,
        email: req.body.email,
        address: req.body.address,
        phone: req.body.phone,
        products: req.body.products
    })

    console.log("Insert User with username: ", req.body.username);

    try {
        const result = await newUser.save();
        res.status(200).json({status: true, data: result})
        console.log("Successful insert of ", req.body.username);
    } catch(err) {
        res.status(400).json({status: false, data: err})
        console.log("Could not insert: " + req.body.username + err);
    }
}

exports.update = async (req, res) => {
    const username = req.params.username;
    console.log("Update User: " + username);

    const updateUser = {
        name: req.body.name,
        surname: req.body.surname,
        email: req.body.email,
        address: req.body.address,
        phone: req.body.phone
    }

    try {
        const result = await User.findOneAndUpdate({username: username}, updateUser);
        res.status(200).json({status: true, data: result})
        console.log("Successful Update of " + username);
    } catch (err){
        res.status(400).json({status: false, data: err})
        console.log("Could not Update: " + username);
    }
}

exports.delete = async(req, res) => {
    const username = req.params.username;
    console.log("Delete user: " + username);
    
    try {
        const result = await User.findOneAndRemove({username: username});
        res.status(200).json({status: true, data: result})
        console.log("Successful delete of " + username);
    } catch (err) {
        res.status(400).json({ status: false, data: err})
        console.log("Problem in deleting user with username: " + username);
    }
}