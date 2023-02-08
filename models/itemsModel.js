const mongoose = require('mongoose');

const itemsSchema = new mongoose.Schema({
    product: {
        type: String,
        unique: true       
    },
    price: {
        type: Number
    }
},
{
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
}
);
const Item = mongoose.model('Item', itemsSchema);

module.exports = Item;
