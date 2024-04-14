const { Student } = require('../models/userModel');
const statisticsService = require('../services/statisticsService');
const userService = require('../services/userService'); // Assuming this service exists for user-related operations
const ApiError = require('../error/ApiError');

class StudentController {
    async getStudentProfile(req, res, next) {
        try {
            const studentId = req.user.id; // Assuming the user ID is in the token and populated in req.user
            const student = await userService.findUserById(studentId); // Assuming userService has a findUserById method
            if (!student) {
                return next(ApiError.notFound('Student profile not found.'));
            }
            res.status(200).json(student);
        } catch (error) {
            next(ApiError.internal(error.message));
        }
    }

    async updateStudentProfile(req, res, next) {
        try {
            const studentId = req.user._id;
            const { name, email, schoolName, className } = req.body;
            const updatedStudent = await Student.findByIdAndUpdate(studentId, {
                name,
                email,
                schoolName,
                className
            }, { new: true });
            res.status(200).json(updatedStudent);
        } catch (error) {
            next(ApiError.internal(error.message));
        }
    }

    async calculateStudentStatistics(req, res, next) {
        try {
            const studentId = req.user.id;
            const statistics = await statisticsService.calculateStudentStatistics(studentId);
            res.status(200).json(statistics);
        } catch (error) {
            next(ApiError.internal(error.message));
        }
    }

    async calculateSubjectStatisticsForStudent(req, res, next) {
        try {
            const { subject } = req.params;
            const studentId = req.user.id;
            const subjectStatistics = await statisticsService.calculateSubjectStatisticsForStudent(studentId, subject);
            res.status(200).json(subjectStatistics);
        } catch (error) {
            next(error);
        }
    }
}

module.exports = new StudentController();
