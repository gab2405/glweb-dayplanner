const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create a schema
const categorySchema = new Schema({
    title: String,
    user_id: String,
    deleted: {
        type: Boolean,
        default: false
    }
});

const Category = mongoose.model('category', categorySchema);
module.exports = Category;