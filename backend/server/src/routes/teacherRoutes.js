const express = require('express');
const authMiddleware = require('../middlewares/authMiddleware');
const teacherController = require('../controllers/teacherController');

const router = express.Router();

router.use(authMiddleware);

router.get('/:schoolName/:className/students', teacherController.viewStudentsOfClass);
router.get('/:schoolName/:className/statistics', teacherController.getClassStatistics);
router.get('/students/:studentId', teacherController.viewStudentProfileAndStatistics);
router.put('/students/:studentId', teacherController.editStudentProfile);
router.post('/students/:studentId/scores', teacherController.addScoresToStudent);
router.get('/students/:studentId/subjects/:subject', teacherController.viewSubjectDetailsOfStudent);
router.get('/profile', teacherController.viewTeacherProfile);
router.put('/profile', teacherController.editTeacherProfile);

module.exports = router;
