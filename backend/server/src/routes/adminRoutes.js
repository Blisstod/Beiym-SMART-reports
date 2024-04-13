const express = require('express');
const adminAuth = require('../middlewares/authAdminMiddleware');
const adminController = require('../controllers/adminController');

const router = express.Router();

router.post('/class',adminAuth, adminController.createClass);
router.get('/class',adminAuth, adminController.getAllClasses);

module.exports = router;
