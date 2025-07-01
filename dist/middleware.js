"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateLogin = exports.validate = exports.loginHandler = void 0;
const zod_1 = require("zod");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dotenv_1 = __importDefault(require("dotenv"));
const path_1 = __importDefault(require("path"));
dotenv_1.default.config({ path: path_1.default.resolve(__dirname, '../config/.env') });
const loginHandler = (req, res, next) => {
    const token = req.headers.authorization;
    if (!token) {
        res.status(401).json({ error: "Unauthorized" });
        return;
    }
    try {
        const decoded = jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET);
        console.log("Decoded token:", decoded);
        if (!decoded) {
            res.status(401).json({ error: "Invalid token" });
            return;
        }
        const payload = decoded;
        req.user = { id: payload.id };
        console.log("User ID from token:", req.user);
        next();
    }
    catch (error) {
        console.error("Token verification error:", error);
        res.status(401).json({ error: "Invalid token" });
        return;
    }
};
exports.loginHandler = loginHandler;
const validate = (req, res, next) => {
    console.log("Request body:", req.body);
    const signupSchema = zod_1.z.object({
        username: zod_1.z.string().min(3, "Username must be at least 3 characters long"),
        password: zod_1.z.string().min(8).max(20)
            .refine((val) => /[A-Z]/.test(val), { message: "Password must contain at least one uppercase letter" })
            .refine((val) => /[a-z]/.test(val), { message: "Password must contain at least one lowercase letter" })
            .refine((val) => /[0-9]/.test(val), { message: "Password must contain at least one number" })
            .refine((val) => /[^a-zA-Z0-9]/.test(val), // special character
        { message: "Password must contain at least one special character" }),
    });
    const result = signupSchema.safeParse(req.body);
    console.log("Validation result:", result);
    if (!result.success) {
        if (!result.success) {
            const formatted = result.error.format();
            console.log(formatted);
            res.status(411).json({
                success: false,
                message: "Invalid input fields",
                errors: formatted,
            });
        }
    }
    // req.body = result.data;
    next();
};
exports.validate = validate;
// Middleware to validate request body for login
const validateLogin = (req, res, next) => {
    const loginSchema = zod_1.z.object({
        username: zod_1.z.string().min(3, "Username must be at least 3 characters long"),
        password: zod_1.z.string().min(8, "Password must be at least 8 characters long"),
    });
    const result = loginSchema.safeParse(req.body);
    console.log("Login validation result:", result);
    if (!result.success) {
        const formatted = result.error.format();
        console.log(formatted);
        res.status(411).json({
            success: false,
            message: "Invalid input fields",
            errors: formatted,
        });
        return;
    }
    next();
};
exports.validateLogin = validateLogin;
