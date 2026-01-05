const { z } = require('zod');

const registerSchema = z.object({
    email: z.string({required_error: "Email is required"}).email({message: "Invalid email format"}).trim().toLowerCase(),
    password: z.string({required_error: "Password is required"}).min(6, {message: "Password must be at least 6 characters long"}).regex(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/, {message: "Password must contain at least one letter and one number"}),
    role: z.enum(['CLIENT', 'SUPPORT']),
});

const loginSchema = z.object({
    email: z.string({required_error: "Email is required"}).email({message: "Invalid email format"}).trim().toLowerCase(),
    password: z.string({required_error: "Password is required"}),
});

module.exports = {
    registerSchema,
    loginSchema,
};