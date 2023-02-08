const Item = require('../models/itemsModel');

exports.getItems = async(req, res, next) =>{
    const products = await Item.find();

    res.status(200).json({
        status: 'success',
        data: {
            products
        }
    })
}
exports.createItem = async(req, res, next) =>{
    const product = await Item.create(req.body);

    res.status(201).json({
        status: 'created',
        data: {
            product
        }
    })
    next();
}