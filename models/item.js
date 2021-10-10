const mongo = require('./index');
const {Schema} = mongo;

const itemSchema = {
    id: String,
    name: String,
    description: String,
    price: Number,
    image: String,
    options: Schema.Types.Mixed
};

module.exports = itemSchema;