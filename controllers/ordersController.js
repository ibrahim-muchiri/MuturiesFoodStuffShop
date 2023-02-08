const Order = require("../models/orderModel");
const createError = require("../utils/error");

exports.createOrder = async(req, res, next) =>{
    const order = await Order.create(req.body);
    // console.log(order);

    res.status(201).json({
        status: 'created',
        data: {
            order
        }        
    })
    next();   
    
}
exports.getOrders = async(req, res, next) =>{
    const orders = await Order.find()   

    res.status(200).json({
        status: "success",
        data: {
            orders
        }
    })
}

exports.getOrder = async(req, res, next) =>{
    const order = await Order.findById(req.params.id)
    if(!order) {
        return next(createError('No order with that Id, please try to check the id', 404));
    }
    // console.log(order);
    res.status(200).json({
        status: "success",
        data: {
            order
        }
    })
    next();
}