const express = require('express');
<<<<<<< HEAD
const adminRoutes = require('./adminRoutes')
const authRoutes = require('./authRoutes')
=======
const authRoutes = require('./authRoutes')
const adminRoutes = require('./adminRoutes')
>>>>>>> 47ebeb3a3eccd41eb46064212b151a507351bcb3
const classRoutes = require('./classRoutes')
const parentRoutes = require('./parentRoutes')
const studentRoutes = require('./studentRoutes')
const teacherRoutes = require('./teacherRoutes')

const router = new express.Router()

// router.use('/admin', adminRoutes)
router.use('/auth', authRoutes)
<<<<<<< HEAD
// router.use('/class', classRoutes)
// router.use('/parent', parentRoutes)
// router.use('/student', studentRoutes)
// router.use('/teacher', teacherRoutes)
=======
router.use('/admin', adminRoutes)
// router.use('/class', classRoutes)
// router.use('/parent', parentRoutes)
// router.use('/student', studentRoutes)
router.use('/teacher', teacherRoutes)
>>>>>>> 47ebeb3a3eccd41eb46064212b151a507351bcb3

module.exports = router