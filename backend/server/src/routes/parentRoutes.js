const express = require('express');
const authMiddleware = require('../middlewares/authMiddleware');
const parentController = require('../controllers/parentController');

const router = express.Router();

router.use(authMiddleware)

router.get('/children', parentController.getAllChilds)
router.get('/:childEmails/statistics', parentController.getChildStatistics)
router.get('/:childEmails/subjects/:subject/statistics', parentController.getChildSubjectStatistic)

module.exports = router;
