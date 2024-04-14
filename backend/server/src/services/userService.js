const { User, Student, Teacher, Parent } = require('../models/userModel');
const Class = require('../models/classModel')
class UserService {
    async findUserByEmail(email) {
        return User.findOne({ email });
    }

    async getClassesForTeacher(teacherId) {
        return Class.find({ teacherId }).populate('studentIds');
    }

    async findUserById(userId) {
        return User.findById(userId);
    }


    async createUser(data, role) {
        switch (role) {
            case 'Student':
                return Student.create(data);
            case 'Teacher':
                return Teacher.create(data);
            case 'Parent':
                return Parent.create(data);
            default:
                return User.create(data);
        }
    }
}

module.exports = new UserService();
