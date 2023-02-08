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
    const item = await Item.create({...req.body});
    // console.log(product);

    res.status(201).json({
        status: 'created',
        data: {
            item
        }
    })
    next();
}