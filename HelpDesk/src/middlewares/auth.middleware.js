const passport = require('passport');

const requireAuth = passport.authenticate('jwt', { session: false });

const requireRole = (role) => {
    return (req, res, next) => {
        if (req.user && req.user.role === role) {
            return next();
        } else {
            return res.status(403).json({ message: 'Forbidden' });
        }
    };
}

module.exports = {
    requireAuth,
    requireRole
};