const mongo = require('./index');
const {Schema} = mongo;

const compositionSchema = {
    id: String,
    name: String,
    options: Schema.Types.Mixed
}

module.exports = compositionSchema;

