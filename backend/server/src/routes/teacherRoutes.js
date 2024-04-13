const express = require('express');
const authMiddleware = require('../middlewares/authMiddleware');
const teacherController = require('../controllers/teacherController');

const router = express.Router();

router.use(authMiddleware);

router.get('/classes/:classId/students', teacherController.viewStudentsOfClass);
router.get('/classes/:classId/statistics', teacherController.getClassStatistics);
router.get('/students/:studentId', teacherController.viewStudentProfile);
router.put('/students/:studentId', teacherController.editStudentProfile);
router.post('/students/:studentId/scores', teacherController.addScoresToStudent);
router.get('/students/:studentId/subjects/:subject', teacherController.viewSubjectDetailsOfStudent);
router.get('/teachers/:teacherId', teacherController.viewTeacherProfile);
router.put('/teachers/:teacherId', teacherController.editTeacherProfile);

module.exports = router;
