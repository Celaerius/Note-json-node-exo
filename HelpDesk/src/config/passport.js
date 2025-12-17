const {Strategy: JwtStrategy, ExtractJwt} = require('passport-jwt');
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');
const UserEntity = require('../models/user.entity');
const AppDataSource = require('../config/data-source');


const jwtOptions = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: process.env.JWT_SECRET || 'your_jwt_secret_key',
};

module.exports = function(passport) {
    const loginOptions = {
        usernameField: 'email',
        passwordField: 'password',
    };
    passport.use(
        new JwtStrategy(jwtOptions, async (jwt_payload, done) => {
            try {
                const userRepository = AppDataSource.getRepository(UserEntity);
                const user = await userRepository.findOneBy({ id: jwt_payload.id });

                if (user) {
                    return done(null, user);
                } else {
                    return done(null, false);
                }
            } catch (err) {
                return done(err, false);
            }
        })
    );

    passport.use(
    new LocalStrategy(loginOptions, async (email, password, done) => {
    try {
        const userRepository = AppDataSource.getRepository(UserEntity);
        const user = await userRepository.findOneBy({ email });

        if (!user) {
            return done(null, false, { message: 'Incorrect email.' });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return done(null, false, { message: 'Incorrect password.' });
        }

        return done(null, user);
    } catch (err) {
        return done(err);
    }
}));
}

