const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
    product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Item',
        required: true
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
},
{
   toJSON: { virtuals: true },
   toObject: { virtuals: true }
} 
);
orderSchema.pre(/^find/, function(next) {
    this.populate({
        path: 'product',
        select: 'product price'
    }).populate({
        path: 'user',
        select: 'username'
    });
    next();
})
const Order = mongoose.model('Order', orderSchema);

module.exports = Order;