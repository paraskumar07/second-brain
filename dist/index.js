"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const db_1 = require("./db");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dotenv_1 = __importDefault(require("dotenv"));
const path_1 = __importDefault(require("path"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const middleware_1 = require("./middleware");
const db_2 = require("./db");
dotenv_1.default.config({ path: path_1.default.resolve(__dirname, '../config/.env') });
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.post("/api/v1/signup", middleware_1.validate, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("Request body: 2", req.body);
    try {
        console.log("Request body:3", req.body);
        const { username, password } = req.body;
        console.log("Signup request received:", { username, password });
        const user = yield db_1.UserModel.findOne({ username });
        if (user) {
            res.status(403).json({ error: "Username already exists" });
            return;
        }
        const saltRounds = 10; // standard strength
        const hashedPassword = yield bcrypt_1.default.hash(password, saltRounds);
        yield db_1.UserModel.create({ username, password: hashedPassword });
        res.status(200).json({
            success: true,
            message: "User created successfully",
        });
        return;
    }
    catch (error) {
        console.error("Signup error:", error);
        res.status(500).json({
            success: false,
            message: "Internal Server Error",
        });
        return;
    }
}));
app.post("/api/v1/login", middleware_1.validateLogin, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { username, password } = req.body;
        console.log("Username from request:", username);
        console.log("Username from request:", password);
        const allUsers = yield db_1.UserModel.find({});
        console.log("All users in DB:", allUsers);
        const user = yield db_1.UserModel.findOne({ username });
        if (!user) {
            res.status(403).json({ error: "user does not exists" });
            return;
        }
        // Check if the password matches the hashed password in the database
        const isPasswordValid = yield bcrypt_1.default.compare(password, user.password);
        if (!isPasswordValid) {
            res.status(403).json({ error: "Invalid password" });
            return;
        }
        const payload = {
            id: user._id,
        };
        const token = jsonwebtoken_1.default.sign(payload, process.env.JWT_SECRET, {
            expiresIn: "1h"
        });
        res.status(200).json({
            success: true,
            message: "Login successful",
            token,
        });
        return;
    }
    catch (error) {
        console.error("Login error:", error);
        res.status(500).json({
            success: false,
            message: `Internal Server Error ${error}`,
        });
        return;
    }
}));
app.post("/api/v1/addContent", middleware_1.loginHandler, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const { title, link, type, tags } = req.body;
        if (!((_a = req.user) === null || _a === void 0 ? void 0 : _a.id)) {
            res.status(401).json({ error: "Unauthorized. No user ID found." });
            return;
        }
        yield db_2.ContentModel.create({
            title,
            link,
            type,
            tags,
            userId: req.user, // Assuming user ID is stored in req.user
            createdAt: new Date(),
            updatedAt: new Date(),
        });
        res.status(200).json({
            success: true,
            message: "Content added successfully",
        });
        return;
    }
    catch (error) {
        console.error("Error adding content:", error);
        res.status(500).json({
            success: false,
            message: `Internal Server Error ${error}`,
        });
        return;
    }
}));
(0, db_1.connectDB)().then(() => {
    app.listen(3000, () => {
        console.log("🚀 Server started on port 3000");
    });
});
