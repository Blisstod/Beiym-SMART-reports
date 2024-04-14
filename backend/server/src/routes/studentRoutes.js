const express = require('express');
const authMiddleware = require('../middlewares/authMiddleware');
const studentController = require('../controllers/studentController');

const router = express.Router();

router.use(authMiddleware)

router.get('/:studentId', studentController.getStudentProfile);
router.put('/:studentId', studentController.updateStudentProfile);
router.get('/:studentId/statistics', studentController.calculateStudentStatistics);
router.get('/:studentId/subjects/:subject/statistics', studentController.calculateSubjectStatisticsForStudent);

module.exports = router;
