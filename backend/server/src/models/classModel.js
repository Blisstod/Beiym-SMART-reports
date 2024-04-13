const mongoose = require('mongoose');

const classSchema = new mongoose.Schema({
    schoolName: { type: String, required: true },
    className: { type: String, required: true },
    teacherId: { type: mongoose.Schema.Types.ObjectId, ref: 'Teacher' },
    studentIds: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Student' }]
}, { timestamps: true });

const Class = mongoose.model('Class', classSchema);

module.exports = Class;