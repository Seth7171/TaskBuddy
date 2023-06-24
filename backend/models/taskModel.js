const mongoose = require("mongoose")

const Schema = mongoose.Schema

const taskSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    note: {
        type: String,
        required: false
    },
    deadline: {
        type: Date,
        required: false
    },
    type: {
        type: String,
        enum: ["","personal", "work", "home", "educational"],
        required: false
    },
    priority: {
        type: String,
        enum: ["","none", "low", "medium", "high"],
        required: false
    },
    isCompleted: {
        type: Boolean,
        default: false,
    },
    user_id: {
        type: String,
        required: true
    }
}, { timestamps:true })

module.exports = mongoose.model('Task', taskSchema)