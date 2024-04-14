const { Student } = require('../models/userModel');
const Class = require('../models/classModel')

class StatisticsService {
    async calculateClassStatistics(classId) {
        const classInfo = await Class.findById(classId).populate({
            path: 'studentIds',
            populate: {
                path: 'exams'
            }
        });

        if (!classInfo) {
            throw new Error('Class not found');
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

        const averagesByDate = dateScores.map(ds => ({
            date: ds.date,
            avgScore: ds.scores.reduce((a, b) => a + b, 0) / ds.scores.length
        }));

        const overallAverage = totalScores.reduce((a, b) => a + b, 0) / totalScores.length;

        return {
            overallAverage,
            averagesByDate
        };
    }

    async calculateStudentStatistics(studentId) {
        const student = await Student.findById(studentId).populate('exams');
        if (!student) {
            throw new Error('Student not found');
        }

        // Filter out any null or undefined exam entries before mapping
        return student.exams.filter(exam => exam !== null && exam !== undefined).map(exam => ({
            date: exam.date,
            totalScore: exam.totalScore
        }));
    }


    async calculateSubjectStatisticsForStudent(studentId, subject) {
        const student = await Student.findById(studentId);
        if (!student) {
            throw new Error('Student not found');
        }

        const subjectScores = [];

        console.log("Examining exams for student:", student);

        for (const exam of student.exams || []) {
            // Check if exam is not null and the specific subject score exists
            if (exam && exam[subject] !== undefined) {
                subjectScores.push({
                    date: exam.date,
                    score: exam[subject]
                });
            }
        }

        console.log("Processed subject scores:", subjectScores);

        const avgScore = subjectScores.length > 0
            ? subjectScores.reduce((acc, curr) => acc + curr.score, 0) / subjectScores.length
            : 0;

        console.log("Calculated average score:", avgScore);

        return {
            allTimeScores: subjectScores,
            averageScore: avgScore
        };
    }

}

module.exports = new StatisticsService();
