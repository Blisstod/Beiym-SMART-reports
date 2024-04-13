const mongoose = require('mongoose');

const subjectProfileSchema = new mongoose.Schema({
    subjectName: { type: String, required: true },
    score: { type: Number, default: 0, max: 50 }
}, { _id: false });

const profileSchema = new mongoose.Schema({
    profileName: { type: String, required: true },
    subjects: [subjectProfileSchema]
}, { timestamps: true });

const Profile = mongoose.model('Profile', profileSchema);

module.exports = Profile;