const jwt = require('jsonwebtoken');
const { User } = require('../models/userModel');
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

    async register(req, res, next) {
        try {
            const { email, name, surname, password, role } = req.body;
            const exists = await User.findOne({ email });
            if (exists) {
                return next(ApiError.conflict('Email already in use.'));
            }
            const user = await User.create({ email, name, surname, password, role });
            const token = generateJwt(user._id, user.email, user.role);
            res.status(201).json({ token });
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
}

module.exports = new AuthController();
