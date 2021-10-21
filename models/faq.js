const mongo = require('./index');
const {Schema} = mongo;

const faqSchema = {
    id: String,
    question: String,
    answer: String,
    options: Schema.Types.Mixed
}

module.exports = faqSchema;