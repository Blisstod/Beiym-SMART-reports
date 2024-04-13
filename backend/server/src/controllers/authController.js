const jwt = require('jsonwebtoken');
const bcrypt = require
const { User , Student, Parent, Teacher} = require('../models/userModel');
const ApiError = require('../error/ApiError');

const generateJwt = (id, email, role) => {
    return jwt.sign(
        { id, email, role },
        process.env.JWT_SECRET,
        { expiresIn: '5h' }
    );
};

class AuthController {


    async login(req, res, next) {
        try {
            const { email, password } = req.body;
            const user = await User.findByCredentials(email, password);
            if (!user) {
                return next(ApiError.unauthorized('Incorrect email or password'));
            }
            const token = generateJwt(user._id, user.email, user.role);
            res.json({ token });
        } catch (error) {
            next(ApiError.internal(error.message));
        }
    }

    async check(req, res, next) {
        try {
            const token = generateJwt(req.user._id, req.user.email, req.user.role);
            res.json({ token });
        } catch (error) {
            next(ApiError.internal('Error generating token'));
        }
    }

    async registerStudent(req, res, next) {
        try {
            const {
                email,
                name,
                surname,
                password,
                classId,
                profileSubject1,
                profileSubject2
            } = req.body;

            const userExists = await User.findOne({ email });
            if (userExists) {
                return next(ApiError.conflict('Email already in use.'));
            }

            const student = await Student.create({
                email,
                name,
                surname,
                password,
                classId,
                profileSubject1,
                profileSubject2,
                exams: []
            });

            const token = generateJwt(student._id, student.email, student.role);
            res.status(201).json({ token });
        } catch (error) {
            next(ApiError.internal(error.message));
        }
    }



    async registerTeacher(req, res, next) {
        try {
            const { email, name, surname, password, schoolName, className } = req.body;
            const userExists = await User.findOne({ email });
            if (userExists) {
                return next(ApiError.conflict('Email already in use.'));
            }
            const teacher = await Teacher.create({
                email,
                name,
                surname,
                password,
                schoolName,
                className
            });
            const token = generateJwt(teacher._id, teacher.email, teacher.role);
            res.status(201).json({ token });
        } catch (error) {
            next(ApiError.internal(error.message));
        }
    }

    async registerParent(req, res, next) {
        try {
            const { email, name, surname, password, childEmails, childStudentIds } = req.body;
            const userExists = await User.findOne({ email });
            if (userExists) {
                return next(ApiError.conflict('Email already in use.'));
            }
            const parent = await Parent.create({
                email,
                name,
                surname,
                password,
                childEmails,
                childStudentIds
            });
            const token = generateJwt(parent._id, parent.email, parent.role);
            res.status(201).json({ token });
        } catch (error) {
            next(ApiError.internal(error.message));
        }
    }

    async register(req, res, next){
        const {name, surname, email, password} = req.body

        const exists = await User.findOne({ email } );
        if(exists){
            return next(ApiError.conflict('User this Email already exists!'))
        }
        const user = await User.create({name: name, surname: surname, email: email, password: password})
        const token = generateJwt(user.id, user.email, user.role)
        return res.json({token})
    }

}

module.exports = new AuthController();
