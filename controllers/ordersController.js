const Order = require("../models/orderModel");
const AppError = require("../utils/appError");
const catchAsync = require("../utils/catchAsync");

exports.createOrder = catchAsync(async(req, res, next) =>{
    const order = await Order.create(req.body);
    // console.log(order);

    res.status(201).json({
        status: 'created',
        data: {
            order
        }        
    })
    next();   
    
})
exports.getOrders = catchAsync(async(req, res, next) =>{
    const orders = await Order.find()   

    res.status(200).json({
        status: "success",
        data: {
            orders
        }
    })
})

exports.getOrder = catchAsync(async(req, res, next) =>{
    const order = await Order.findById(req.params.id)
    if(!order){
        return next(new AppError('No order with that ID, kindly check and try again!', 404));
    }
    // console.log(order);
    res.status(200).json({
        status: "success",
        data: {
            order
        }
    })
    next();
});