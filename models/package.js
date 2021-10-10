const mongo = require('./index');
const {Schema} = mongo;
const modelName = "package";
const {compositionSchema} = require('./composition');

const packageSchema = new Schema({
    name : String,
    price : Number,
    note : String,
    composition : [compositionSchema]
});

const Model = mongo.model(modelName,packageSchema);
module.exports = Model;