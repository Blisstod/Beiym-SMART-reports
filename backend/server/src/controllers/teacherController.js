const { User, Student, Teacher, Class } = require('../models/userModel');
const ApiError = require('../error/ApiError')

class TeacherController {
    async viewStudentsOfClass(req, res, next) {
        try {
            const { teacherId } = req.user; // Assuming teacherId is available in req.user after authentication
            const classes = await Class.find({ teacherId }).populate('studentIds');
            res.status(200).json(classes);
        } catch (error) {
            next(new ApiError.internal('Failed to fetch class students'))
        }
    }

    async addScoresToStudent(req, res, next) {
        try {
            const { studentId, scores } = req.body; // scores should be an object with subject scores
            const student = await Student.findById(studentId);
            if (!student) {
                next(new ApiError.notFound('Student not found'));
            }

            student.exams.push(scores);
            await student.save();
            res.status(200).json({ message: "Scores updated successfully", student });
        } catch (error) {
            next(new ApiError.internal('Failed to add scores'))
        }
    }

    async viewStudentProfile(req, res, next) {
        try {
            const { studentId } = req.params;
            const student = await Student.findById(studentId).populate('classId');
            if (!student) {
                return next(new ApiError('Student not found', 404));
            }
            res.status(200).json(student);
        } catch (error) {
            next(new ApiError.internal('Failed to fetch student'))
        }
    }

    async viewTeacherProfile(req, res, next) {
        try {
            const { teacherId } = req.params; // Assuming teacherId is passed as a URL parameter
            const teacher = await Teacher.findById(teacherId).populate('classId');
            if (!teacher) {
                return next(new ApiError('Teacher not found', 404));
            }
            res.status(200).json(teacher);
        } catch (error) {
            next(new ApiError.internal('Failed to fetch teacher'))
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
            next(new ApiError.internal('Failed to update teacher'))
        }
    }

    async editStudentProfile(req, res, next) {
        try {
            const { studentId } = req.params;
            const { name, email, classId } = req.body;
            const updatedStudent = await Student.findByIdAndUpdate(studentId, {
                name,
                email,
                classId
            }, { new: true });
            res.status(200).json(updatedStudent);
        } catch (error) {
            next(new ApiError('Failed to update student', 500));
        }
    }

    async getClassStatistics(req, res, next) {
        try {
            const { classId } = req.params;
            const classInfo = await Class.findById(classId).populate({
                path: 'studentIds',
                populate: {
                    path: 'exams'
                }
            });

            if (!classInfo) {
                return next(new ApiError('Class not found', 404));
            }

            let dateScores = [];
            let totalScores = [];

            classInfo.studentIds.forEach(student => {
                student.exams.forEach(exam => {
                    totalScores.push(exam.totalScore);
                    const dateIndex = dateScores.findIndex(d => d.date.toISOString().split('T')[0] === exam.date.toISOString().split('T')[0]);

                    if (dateIndex > -1) {
                        dateScores[dateIndex].scores.push(exam.totalScore);
                    } else {
                        dateScores.push({
                            date: exam.date.toISOString().split('T')[0], // Use just the date part for simplicity
                            scores: [exam.totalScore]
                        });
                    }
                });
            });

            const averagesByDate = dateScores.map(ds => {
                return {
                    date: ds.date,
                    avgScore: ds.scores.reduce((a, b) => a + b, 0) / ds.scores.length
                };
            });

            const overallAverage = totalScores.reduce((a, b) => a + b, 0) / totalScores.length;

            res.status(200).json({
                overallAverage,
                averagesByDate
            });
        } catch (error) {
            next(new ApiError('Failed to calculate class statistics', 500));
        }
    }

    async viewSubjectDetailsOfStudent(req, res, next) {
        try {
            const { studentId, subject } = req.params;
            const student = await Student.findById(studentId);
            if (!student) {
                return next(new ApiError('Student not found', 404));
            }

            const subjectScores = student.exams.map(exam => {
                return { date: exam.date, score: exam[subject] };
            });

            const avgScore = subjectScores.reduce((acc, curr) => acc + curr.score, 0) / subjectScores.length;

            res.status(200).json({
                allTimeScores: subjectScores,
                averageScore: avgScore
            });
        } catch (error) {
            next(new ApiError('Failed to fetch subject details', 500));
        }
    }
}

module.exports = new TeacherController();
