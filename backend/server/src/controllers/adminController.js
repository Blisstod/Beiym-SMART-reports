const {User} = require('../models/userModel')
const Class = require('../models/classModel');
const ApiError = require('../error/ApiError')
const bcrypt = require('bcrypt')

class AdminController {
    async createClass(req, res, next) {
        try {
            const { schoolName, className } = req.body;
            const newClass = await Class.create({
                schoolName: schoolName,
                className: className
            });
            res.status(201).json(newClass);
        } catch (error) {
            next(ApiError.internal(error.message));
        }
    }

    async getAllClasses(req, res, next) {
        try {
            const classes = await Class.find().populate('teacherId').populate('studentIds');
            res.status(200).json(classes);
        } catch (error) {
            next(ApiError.internal(error.message));
        }
    }
}

module.exports = new AdminController();
