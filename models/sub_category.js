const mongo = require('./index');
const {Schema} = mongo;
const {itemSchema} = require('./item');
const modelName = "sub_category";

const subCategorySchema = new Schema({
    category_id: String,
    items: [itemSchema],
    id: String,
    name: String,
    price: Number,
    image: String,
    options: Schema.Types.Mixed
});

const Model = mongo.model(modelName, subCategorySchema);

module.exports = Model;