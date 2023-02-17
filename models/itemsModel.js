const mongoose = require('mongoose');

const itemsSchema = new mongoose.Schema({
    product: {
        type: String,
        required: true,
        unique: true       
    },
    price: {
        type: Number,
        required: true
    }
},
{
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
}
);
const Item = mongoose.model('Item', itemsSchema);

module.exports = Item;
