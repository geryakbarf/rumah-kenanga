const mongo = require('./index');
const {Schema} = mongo;
const categorySchema = require('./category');
const faqSchema = require('./faq')
const modelName = "vendor";

const vendorSchema = new Schema({
    name: String,
    type: String,
    instagram: String,
    youtube: String,
    web: String,
    phone: String,
    image: String,
    category: [categorySchema],
    faq: [faqSchema],
    options: Schema.Types.Mixed
}, {timestamps: {}});

const Model = mongo.model(modelName, vendorSchema);
module.exports = Model;