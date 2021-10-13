const mongo = require('./index');
const {Schema} = mongo;
const modelName = "package";

const packageSchema = new Schema({
    vendorId: String,
    name: String,
    price: Number,
    note: String,
    composition: String,
    image: String,
    options: Schema.Types.Mixed
}, {timestamps: {}});

const Model = mongo.model(modelName, packageSchema);
module.exports = Model;