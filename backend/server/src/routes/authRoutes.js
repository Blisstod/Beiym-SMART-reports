const express = require('express')
const authMiddleware = require('../middlewares/authMiddleware')
const authController = require('../controllers/authController')

router = express.Router();

router.get('/', (req, res)=>{
    res.status(200).json({message: "Everything works fine!"})
})
router.post('/login', authController.login);
<<<<<<< HEAD
router.post('/registration', authController.register);
=======
router.post('/register', authController.register);
router.post('/register/student', authController.registerStudent);
router.post('/register/parent', authController.registerParent);
router.post('/register/teacher', authController.registerTeacher);
>>>>>>> 47ebeb3a3eccd41eb46064212b151a507351bcb3
router.get('/auth', authMiddleware, authController.check)

module.exports = router;