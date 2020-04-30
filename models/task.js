const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create a childSchema
var taskDay = new Schema({
    date: {
        type: Date
    },
    done: {
        type: Boolean,
        default: false
    }
});

// Create a schema
const taskSchema = new Schema({
    title: String,
    description: String,
    category_id: String,
    user_id: String,
    deleted: {
        type: Boolean,
        default: false
    },
    dates: {
        createdOn: Date,
        startOn: Date,
        endOn: Date,
        mon: {
            type: Boolean,
            default: false
        },
        tue: {
            type: Boolean,
            default: false
        },
        wed: {
            type: Boolean,
            default: false
        },
        thu: {
            type: Boolean,
            default: false
        },
        fri: {
            type: Boolean,
            default: false
        },
        sat: {
            type: Boolean,
            default: false
        },
        sun: {
            type: Boolean,
            default: false
        },
    },
    priority: Number,
    taskdays: [taskDay]
});

const Task = mongoose.model('task', taskSchema);
module.exports = Task;