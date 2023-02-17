const Item = require('../models/itemsModel');
const catchAsync = require("../utils/catchAsync");

exports.getItems = catchAsync(async(req, res, next) =>{
    const products = await Item.find();

    res.status(200).json({
        status: 'success',
        data: {
            products
        }
    })
})



exports.createItem = catchAsync(async(req, res, next) =>{
    const item = await Item.create(req.body);    

    res.status(201).json({
        status: 'created',
        data: {
            item
        }
    })
    next(err);
})