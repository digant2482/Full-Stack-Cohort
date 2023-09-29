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
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const { authenticateUser, secretKeyUser } = require("../Authentication/Authentication");
const { Users, Courses } = require("../Database/mongooseModels");
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
router.post('/signup', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { username, password } = req.body;
    const user = yield Users.findOne({ username });
    if (user) {
        res.status(403).send("Username is taken, please try another username");
        return;
    }
    const newUser = new Users({ username, password });
    yield newUser.save();
    //Send authorization token
    const token = jsonwebtoken_1.default.sign({ username, role: 'user' }, secretKeyUser, { expiresIn: '1h' });
    res.send({ message: "User created successfully", token });
}));
router.post('/login', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { username, password } = req.headers;
    const user = yield Users.findOne({ username, password });
    if (!user) {
        res.status(403).json({ message: 'User authentication failed' });
        return;
    }
    const token = jsonwebtoken_1.default.sign({ username }, secretKeyUser, { expiresIn: '1h' });
    res.json({ message: "Logged in successfully", token });
}));
//Check login
router.get('/me', authenticateUser, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    res.json({ username: req.headers['username'] });
}));
//View all courses
router.get('/courses', authenticateUser, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const courses = yield Courses.find({ published: true });
    res.json(courses);
}));
//View course by course Id
router.get('/courses/:courseId', authenticateUser, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let courseId = req.params.courseId;
        const course = yield Courses.findById(courseId);
        if (course) {
            res.send(course);
        }
        else {
            res.status(404).json({ message: "Course not found" });
        }
    }
    catch (_a) {
        res.status(404).json({ message: "Course doesn't exist" });
    }
}));
//Purchase course
router.post('/courses/:courseId', authenticateUser, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let courseId = req.params.courseId;
    try {
        const course = yield Courses.findById(courseId);
        const user = yield Users.findOne({ username: req.headers['username'] });
        if (user) {
            user.purchasedCourses.push(course);
            yield user.save();
            res.json({ message: "Course purchased successfully" });
        }
        else {
            res.status(403).json({ message: "User not found" });
        }
    }
    catch (error) {
        res.status(404).json({ message: "Course doesn't exist" });
    }
}));
//View all purchased course
router.get('/purchasedCourses', authenticateUser, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield Users.findOne({ username: req.headers['username'] }).populate("purchasedCourses");
    if (user) {
        res.json({ purchasedCourses: user.purchasedCourses || [] });
    }
    else {
        res.status(403).json({ message: "User not found" });
    }
}));
module.exports = router;
