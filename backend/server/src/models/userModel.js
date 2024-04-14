const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
    email: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    surname: { type: String, required: true },
    password: { type: String, required: true },
    role: { type: String, required: true, enum: ['student', 'teacher', 'parent'] },
}, { timestamps: true, discriminatorKey: 'role' });

userSchema.pre('save', async function(next) {
    if (this.isModified('password')) {
        this.password = await bcrypt.hash(this.password, 5);
    }
    next();
});

userSchema.statics.findByCredentials = async function(email, password) {
    const user = await this.findOne({ email });
    if (!user) {
        throw new Error('Unable to login');
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
        throw new Error('Unable to login');
    }
    return user;
};

const User = mongoose.model('User', userSchema);

const examSchema = new mongoose.Schema({
    date: { type: Date, required: true },
    totalScore: { type: Number, required: true, max: 140 },
    kazakhLang: { type: Number, required: true, max: 10 },
    history: { type: Number, required: true, max: 20 },
    beginnerMath: { type: Number, required: true, max: 10 },
    profileSubject1: { type: String, required: true },
    profileSubject1Score: { type: Number, required: true, max: 50 },
    profileSubject2: { type: String, required: true },
    profileSubject2Score: { type: Number, required: true, max: 50 },
}, { _id: false, timestamps: { createdAt: true, updatedAt: false } });

const studentSchema = new mongoose.Schema({
    schoolName: { type: String, ref: 'Class' },
    className: { type: String, ref: 'Class' },
    profileSubject1: { type: String, required: true },
    profileSubject2: { type: String, required: true },
    exams: [examSchema]
}, { timestamps: true });


const Teacher = User.discriminator('Teacher', new mongoose.Schema({
    schoolName: { type: String, ref: 'Class' },
    className: { type: String }
}));

const Parent = User.discriminator('Parent', new mongoose.Schema({
    childEmails: [{ type: String }],
    // childStudentIds: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Student' }]
}));

const Student = User.discriminator('Student', studentSchema);
module.exports = { User, Student, Teacher, Parent };
