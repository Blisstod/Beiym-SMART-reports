const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt')
const { User , Student, Parent, Teacher} = require('../models/userModel');
const ApiError = require('../error/ApiError');
const Class = require('../models/classModel')
const AuthService = require('../services/authService');
const UserService = require('../services/userService');

class AuthController {

    async login(req, res, next) {
        try {
            const { email, password } = req.body;
            const user = await AuthService.validateUserCredentials(email, password);
            const token = AuthService.generateJwt(user._id, user.email, user.role);
            const userDetails = {
                role: user.role,
                name: user.name,
                id: user._id
            };
            res.json({ token, userDetails });
        } catch (error) {
            next(ApiError.internal(error.message));
        }
    }

    async check(req, res, next) {
        try {
            const token = AuthService.generateJwt(req.user._id, req.user.email, req.user.role);
            res.json({ token });
        } catch (error) {
            next(ApiError.internal('Error generating token'));
        }
    }

    async registerStudent(req, res, next) {
        try {
            const { email, schoolName, className } = req.body;
            const userExists = await UserService.findUserByEmail(email);
            if (userExists) {
                return next(ApiError.conflict('Email already in use.'));
            }

            const student = await UserService.createUser(req.body, 'Student');

            const classObj = await Class.findOneAndUpdate(
                { schoolName, className },
                { $push: { studentIds: student._id } },
                { new: true }
            );

            if (!classObj) {
                await Student.findByIdAndRemove(student._id);
                return next(ApiError.notFound(`Class ${schoolName} ${className} not found`));
            }

            const token = AuthService.generateJwt(student._id, student.email, student.role);
            res.status(201).json({ token, enrolledClass: classObj });
        } catch (error) {
            next(ApiError.internal(error.message));
        }
    }



    async registerTeacher(req, res, next) {
        try {
            const { email, schoolName, className } = req.body;
            const userExists = await UserService.findUserByEmail(email);
            if (userExists) {
                return next(ApiError.conflict('Email already in use.'));
            }

            const teacher = await UserService.createUser(req.body, 'Teacher');

            const classObj = await Class.findOneAndUpdate(
                { schoolName, className },
                { teacherId: teacher._id },
                { new: true, upsert: true } // upsert: true creates the object if it doesn't exist
            );

            const token = AuthService.generateJwt(teacher._id, teacher.email, teacher.role);
            res.status(201).json({ token, class: classObj });
        } catch (error) {
            next(ApiError.internal(error.message));
        }
    }


    async registerParent(req, res, next) {
        try {
            const userExists = await UserService.findUserByEmail(req.body.email);
            if (userExists) {
                return next(ApiError.conflict('Email already in use.'));
            }
            const parent = await UserService.createUser(req.body, 'Parent');
            const token = AuthService.generateJwt(parent._id, parent.email, parent.role);
            res.status(201).json({ token });
        } catch (error) {
            next(ApiError.internal(error.message));
        }
    }

    async register(req, res, next) {
        try {
            const userExists = await UserService.findUserByEmail(req.body.email);
            if (userExists) {
                return next(ApiError.conflict('User with this Email already exists!'));
            }
            const user = await UserService.createUser(req.body, 'User');
            const token = AuthService.generateJwt(user._id, user.email, user.role);
            res.status(201).json({ token });
        } catch (error) {
            next(ApiError.internal('Error during registration'));
        }
    }

}

module.exports = new AuthController();