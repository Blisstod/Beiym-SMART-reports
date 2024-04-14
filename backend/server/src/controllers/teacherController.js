const ApiError = require('../error/ApiError')
const Class = require('../models/classModel')
const { Student , Teacher} = require('../models/userModel')
const statisticsService = require('../services/statisticsService')
const userService = require('../services/userService')

class TeacherController {
    async viewStudentsOfClass(req, res, next) {
        try {
            const { schoolName, className } = req.params;
            const teacherId = req.user.id;

            console.log(`Searching for class with School: ${schoolName}, Class: ${className}, TeacherID: ${teacherId}`);

            const classObj = await Class.findOne({ schoolName, className, teacherId }).populate('studentIds');

            if (!classObj) {
                console.error('Class not found with the provided parameters.');
                return next(ApiError.notFound('Class not found'));
            }

            res.status(200).json(classObj.studentIds);
        } catch (error) {
            console.error('An error occurred:', error);
            next(ApiError.internal('Failed to fetch class students'));
        }
    }


    async addScoresToStudent(req, res, next) {
        try {
            const { studentId } = req.params;
            const scores = req.body;

            const student = await Student.findById(studentId);
            if (!student) {
                return next(ApiError.notFound('Student not found'));
            }

            if (typeof scores.date === 'string') {
                scores.date = new Date(scores.date);
            }

            student.exams.push(scores); // Push the scores object directly into exams
            await student.save();
            res.status(200).json({ message: "Scores updated successfully", student });
        } catch (error) {
            // Corrected usage of ApiError without 'new' keyword
            next(ApiError.internal('Failed to add scores'));
        }
    }


    async viewStudentProfileAndStatistics(req, res, next) {
        try {
            const { studentId } = req.params;
            console.log(`Finding user by ID: ${studentId}`);
            const studentProfile = await userService.findUserById(studentId);

            if (!studentProfile) {
                console.log('Student profile not found');
                return next(ApiError.notFound('Student not found'));
            }

            console.log(`Calculating statistics for student ID: ${studentId}`);
            const studentStatistics = await statisticsService.calculateStudentStatistics(studentId);
            console.log(`Statistics calculated: ${JSON.stringify(studentStatistics)}`);

            const combinedResponse = {
                profile: studentProfile,
                statistics: studentStatistics
            };

            res.status(200).json(combinedResponse);
        } catch (error) {
            console.error('Error in viewStudentProfileAndStatistics:', error);
            next(ApiError.internal('Failed to fetch student data'));
        }
    }

    async viewTeacherProfile(req, res, next) {
        try {
            const { teacherId } = req.params;
            const teacher = await Teacher.findById(teacherId).populate('schoolName').populate('className');
            if (!teacher) {
                return next(new ApiError('Teacher not found', 404));
            }
            res.status(200).json(teacher);
        } catch (error) {
            next(ApiError.internal('Failed to fetch teacher'))
        }
    }

    async editTeacherProfile(req, res, next) {
        try {
            const { teacherId } = req.params;
            const { name, email, schoolName, className } = req.body;
            const updatedTeacher = await Teacher.findByIdAndUpdate(teacherId, {
                name,
                email,
                schoolName,
                className
            }, { new: true });
            res.status(200).json(updatedTeacher);
        } catch (error) {
            next(ApiError.internal('Failed to update teacher'))
        }
    }

    async editStudentProfile(req, res, next) {
        try {
            const { studentId } = req.params;
            const { name, email, schoolName, className } = req.body;
            const updatedStudent = await Student.findByIdAndUpdate(studentId, {
                name,
                email,
                schoolName,
                className
            }, { new: true });
            res.status(200).json(updatedStudent);
        } catch (error) {
            next(new ApiError('Failed to update student', 500));
        }
    }

    async getClassStatistics(req, res, next) {
        try {
            const { schoolName, className } = req.params;
            // console.log(req.user)
            const teacher = await Teacher.findById(req.user.id);
            console.log(teacher)
            const classObj = await Class.findOne({ schoolName, className, teacherId: teacher._id });
            if (!classObj) {
                return next(new ApiError.notFound('Class not found', 404));
            }
                const statistics = await statisticsService.calculateClassStatistics(classObj._id);
            res.status(200).json(statistics);
        } catch (error) {
            next(ApiError.internal('Failed to calculate class statistics'));
        }
    }

    async viewSubjectDetailsOfStudent(req, res, next) {
        try {
            const { studentId, subject } = req.params;
            console.log(`Fetching subject details for Student ID: ${studentId}, Subject: ${subject}`);

            const subjectDetails = await statisticsService.calculateSubjectStatisticsForStudent(studentId, subject);
            res.status(200).json(subjectDetails);
        } catch (error) {
            next(ApiError.internal(`Failed to fetch subject details: ${error.message}`));
        }
    }
}

module.exports = new TeacherController();
