const mongo = require('./index');
const {Schema} = mongo;

const categorySchema = {
    id : String,
    name : String,
    price : Number,
    image : String,
    options : Schema.Types.Mixed
}

module.exports = categorySchema;