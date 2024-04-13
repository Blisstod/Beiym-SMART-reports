const express = require('express');
const adminRoutes = require('./adminRoutes')
const authRoutes = require('./authRoutes')
const classRoutes = require('./classRoutes')
const parentRoutes = require('./parentRoutes')
const studentRoutes = require('./studentRoutes')
const teacherRoutes = require('./teacherRoutes')

const router = new express.Router()

// router.use('/admin', adminRoutes)
router.use('/auth', authRoutes)
// router.use('/class', classRoutes)
// router.use('/parent', parentRoutes)
// router.use('/student', studentRoutes)
// router.use('/teacher', teacherRoutes)

module.exports = router