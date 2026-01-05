const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const UserEntity = require("../models/user.entity");
const AppDataSource = require("../config/data-source");

const userRepository = AppDataSource.getRepository("User");

const register = async (req, res) => {
    try {
        const { name, email, password, role } = req.body;

        const existingUser = await userRepository.findOneBy({ email });
        if (existingUser) {
            return res.status(400).json({ message: "Email already in use."});
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = userRepository.create({
            name,
            email,
            password: hashedPassword,
            role: role || "USER",
        });

        await userRepository.save(newUser);

        res.status(201).json({ message: "User registered successfully." });
    } catch (error) {
        res.status(500).json({ message: "Server error.", error: error.message } );
    }
}

const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await userRepository.findOneBy({ email });
        if (!user) {
            return res.status(400).json({ message: "Invalid email or password." });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: "Invalid email or password." });
        }

        const accessToken = jwt.sign(
            { id: user.id, name: user.name, email: user.email, role: user.role },
            process.env.JWT_SECRET || "your_jwt_secret_key",
            { expiresIn: "15min" }
        );

        const refreshToken = jwt.sign(
            { id: user.id },
            process.env.REFRESH_JWT_SECRET || "your_refresh_jwt_secret_key",
            { expiresIn: "7d" }
        );

        res.status(200).json({ accessToken, refreshToken });
    } catch (error) {
        res.status(500).json({ message: "Server error." });
    }
}

const refresh = async (req, res) => {
    try {
        const { refreshToken } = req.body;
        if (!refreshToken) {
            return res.status(401).json({ message: "No refresh token provided." });
        }

        jwt.verify(
            refreshToken,
            process.env.REFRESH_JWT_SECRET || "your_refresh_jwt_secret_key",
            (err, decoded) => {
                if (err) {
                    return res.status(403).json({ message: "Invalid refresh token." });
                }

                const accessToken = jwt.sign(
                    { id: decoded.id },
                    process.env.JWT_SECRET || "your_jwt_secret_key",
                    { expiresIn: "15min" }
                );

                res.status(200).json({ accessToken });
            }
        );
    } catch (error) {
        res.status(500).json({ message: "Server error." });
    }
}

module.exports = {
    register,
    login,
    refresh,
};