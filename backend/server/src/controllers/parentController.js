// parentController.js
const { Parent, Student } = require('../models/userModel');
const userService = require('../services/userService'); // Assuming this exists and has the relevant methods
const statisticsService = require('../services/statisticsService');
const ApiError = require('../error/ApiError');

class ParentController {
    async getAllChilds(req, res, next) {
        try {
            const parent = await userService.findUserById(req.user.id);
            if (!parent) {
                return next(ApiError.notFound('Parent not found.'));
            }
            const children = await Student.find({ email: { $in: parent.childEmails } });
            res.status(200).json(children);
        } catch (error) {
            next(ApiError.internal(error.message));
        }
    }

    async getChildStatistics(req, res, next) {
        try {
            const childEmail = req.params.childEmails; // Extract child email from URL parameter
            const student = await Student.findOne({email: childEmail});

            if (!student) {
                return next(ApiError.notFound('Child not found.'));
            }

            const statistics = await statisticsService.calculateStudentStatistics(student.id);
            res.status(200).json(statistics);
        } catch (error) {
            next(ApiError.internal(error.message));
        }
    }

    async getChildSubjectStatistic(req, res, next) {
        try {
            const childEmail = req.params.childEmails; // Extract child email from URL parameter
            const { subject } = req.params;

            const student = await Student.findOne({ email: childEmail });

            if (!student) {
                return next(ApiError.notFound('Child not found.'));
            }

            const subjectStatistics = await statisticsService.calculateSubjectStatisticsForStudent(student.id, subject);
            res.status(200).json(subjectStatistics);
        } catch (error) {
            next(error);
        }
    }
}

module.exports = new ParentController();
