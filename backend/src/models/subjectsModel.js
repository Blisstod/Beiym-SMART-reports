const mongoose = require('mongoose');

// Schema for individual subjects within a profile
const subjectProfileSchema = new mongoose.Schema({
    subjectName: { type: String, required: true },
    score: { type: Number, default: 0, max: 50 }
}, { _id: false });

// Schema for the static subjects
const staticSubjectSchema = new mongoose.Schema({
    kazakhLang: { type: Number, default: 10, max: 10 },
    history: { type: Number, default: 20, max: 20 },
    beginnerMath: { type: Number, default: 10, max: 10 }
}, { _id: false });

const subjectsSchema = new mongoose.Schema({
    staticSubjects: staticSubjectSchema
}, { timestamps: true });

const Subjects = mongoose.model('Subjects', subjectsSchema);

module.exports = { Subjects, subjectProfileSchema };
