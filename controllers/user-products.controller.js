const User = require('../models/user.model');

//Find all products from all users
exports.findAll = async(req, res) => {
    console.log("Find all users products")

    try {
        const results = await User.find({},{ username: 1, products: 1 });
        res.status(200).json({ status: true, data: results});
        console.log("Success reading users products");
    } catch (err) {
        res.status(400).json({ status: false, data: err});
        console.log("Problem reading users products");
    }
}

//Find all products from one user
exports.findOne = async(req, res) => {
    const username = req.params.username;
    console.log("Find user: ", username);

    try {
        const results = await User.find({username: username},{ username: 1, products: 1 });
        res.status(200).json({ status: true, data: results});
        console.log(`Success reading ${username} products`);
    } catch (err) {
        res.status(400).json({ status: false, data: err});
        console.log(`Problem finding ${username}'s products`);
    }
}

//Insert Product to username
exports.addProduct = async(req, res) => {
    const username = req.body.username;
    const products = req.body.products;

    console.log(`Add ${products.product} to, ${username}`);

    try {
        const result = await User.updateOne(
            { username: username },
            { 
                $push: {
                    products: products
                }
            }
        );
        res.status(200).json({ status: true, data: result});
        console.log(`Success saving ${username} product`);
    } catch (err) {
        res.status(400).json({ status: false, data: err});
        console.log(`Problem Inserting ${username}'s product`);
    }
}

exports.updateProduct = async (req, res) => {
    const username = req.params.username;
    const product_id = req.body.product._id;
    const quantity = req.body.product.quantity;

    console.log(`Attempting update, Product id: ${product_id}, of user:${username}, Updating Quantity to: ${quantity}`);

    console.log(`Attempting update`);

    try {
        const result = await User.updateOne(
            { username: username, "products._id": product_id },
            {
                $set: {
                    "products.$.quantity": quantity
                }
            }
        );
        res.status(200).json({ status: true, data: result});
        console.log(`Success Updating quantity`);
    } catch (err) {
        res.status(400).json({ status: false, data: err});
        console.log(`Problem Updating ${username}'s product`);
    }
}

exports.deleteProduct = async (req, res) => {
    const username = req.params.username;
    const product = req.params.product;

    console.log(`Attempting Delete of ${product} from user ${username}`);
    try {
        const result = await User.updateOne(
            { username: username },
            {
                $pull: {
                    products: { product: product }
                }
            }
        );
        res.status(200).json({ status: true, data: result});
        console.log(`Success Updating quantity`);
    } catch (err) {
        res.status(400).json({ status: false, data: err});
        console.log(`Problem Deleting ${username}'s product`);
    }
}

exports.stats = async (req, res) => {
    console.log("")

    try {
        const result = await User.aggregate([
            {
                $unwind: "$products"
            },
            {
                $project: {
                    id: 1,
                    username: 1,
                    products: 1
                }
            },
            {
                $group: {
                    _id: {
                        username: "$username",
                        product: "$products.product"
                    },
                    totalAmount: {
                        $sum: {
                            $multiply: ["$products.cost", "$products.quantity"]
                        }
                    },
                    count: { $sum : 1 }
                }
            }
        ]);
        res.status(200).json({ status: true, data: result});
        console.log('Success');
    } catch (err) {
        res.status(400).json({ status: false, data: err});
        console.log('Problem in stats'); 
    }
}