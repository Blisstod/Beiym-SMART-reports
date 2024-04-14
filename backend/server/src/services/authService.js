const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const { User } = require('../models/userModel');

class AuthService {
    generateJwt(id, email, role) {
        return jwt.sign(
            { id, email, role },
            process.env.JWT_SECRET,
            { expiresIn: '5h' }
        );
    }

    async validateUserCredentials(email, password) {
        const user = await User.findOne({ email });
        if (!user) {
            throw new Error('Unable to login');
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            throw new Error('Unable to login');
        }
        return user;
    }
}

module.exports = new AuthService();
