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
        this.password = await bcrypt.hash(this.password, 12);
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

const Student = User.discriminator('Student', new mongoose.Schema({
    studentId: { type: String, required: true, unique: true },
    classId: { type: mongoose.Schema.Types.ObjectId, ref: 'Class' },
    scores: [new mongoose.Schema({
        subject: { type: String, required: true },
        score: { type: Number, required: true },
        total: { type: Number, required: true },
    }, { timestamps: true })],
    selectedProfile: { type: mongoose.Schema.Types.ObjectId, ref: 'Profile' }
}));

const Teacher = User.discriminator('Teacher', new mongoose.Schema({
    teacherId: { type: String, required: true, unique: true },
    classId: { type: mongoose.Schema.Types.ObjectId, ref: 'Class' }
}));

const Parent = User.discriminator('Parent', new mongoose.Schema({
    parentId: { type: String, required: true, unique: true },
    childEmails: [{ type: String }],
    childStudentIds: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Student' }]
}));

module.exports = { User, Student, Teacher, Parent };
