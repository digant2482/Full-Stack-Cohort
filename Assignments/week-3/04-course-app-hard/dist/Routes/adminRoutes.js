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
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const { authenticateAdmin, secretKeyAdmin, validateAuthInputs } = require('../Authentication/Authentication');
const { Admins, Courses } = require('../Database/mongooseModels');
const zod_1 = require("zod");
const router = express_1.default.Router();
const validateCourseInputs = zod_1.z.object({
    title: zod_1.z.string().max(20),
    description: zod_1.z.string().max(100),
    price: zod_1.z.string().max(8),
    published: zod_1.z.boolean(),
    imageLink: zod_1.z.string().max(1000)
});
//Check login
router.get('/me', authenticateAdmin, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    res.json({ username: req.headers['username'] });
}));
router.post('/signup', validateAuthInputs, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { username, password } = req.headers;
    const admin = yield Admins.findOne({ username });
    if (admin) {
        res.status(403).send("Username is taken, please try another username");
        return;
    }
    const newAdmin = new Admins({ username, password });
    yield newAdmin.save();
    //Send authorization token
    const token = jsonwebtoken_1.default.sign({ username, role: 'admin' }, secretKeyAdmin, { expiresIn: '1h' });
    res.send({ message: "Admin created successfully", token });
}));
router.post('/login', validateAuthInputs, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { username, password } = req.headers;
    const admin = yield Admins.findOne({ username, password });
    if (!admin) {
        res.status(403).json({ message: 'Admin authentication failed' });
        return;
    }
    const token = jsonwebtoken_1.default.sign({ username }, secretKeyAdmin, { expiresIn: '1h' });
    res.send({ message: "Logged in successfully", token });
}));
router.post('/courses', authenticateAdmin, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const parsedCourseInput = validateCourseInputs.safeParse(req.body);
    if (parsedCourseInput.success) {
        const newCourse = new Courses(req.body);
        yield newCourse.save();
        //Add courses to admin's course section
        const admin = yield Admins.findOne({ username: req.headers['username'] });
        admin.courses.push(newCourse);
        yield admin.save();
        res.send({ message: "Course created successfully", courseId: newCourse.id });
    }
    else {
        res.status(403).send({ message: parsedCourseInput.error });
    }
}));
router.get('/courses/:courseId', authenticateAdmin, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const courseId = req.params.courseId;
    try {
        const course = yield Courses.findById(courseId);
        if (course) {
            res.json(course);
        }
        else {
            res.status(403).send("Course not found");
        }
    }
    catch (_a) {
        res.status(404).json({ message: "Course not found" });
    }
}));
router.put('/courses/:courseId', authenticateAdmin, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const parsedCourseInput = validateCourseInputs.safeParse(req.body);
    if (parsedCourseInput.success) {
        try {
            const course = yield Courses.findByIdAndUpdate(req.params.courseId, req.body);
            if (course) {
                res.json({ message: "Course updated successfully" });
            }
            else {
                res.status(403).json({ message: "Invalid username or password" });
            }
        }
        catch (_b) {
            res.status(404).json({ message: "Course not found" });
        }
    }
    else {
        res.status(403).send({ message: parsedCourseInput.error });
    }
}));
router.get('/courses', authenticateAdmin, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const admin = yield Admins.findOne({ username: req.headers['username'] }).populate("courses");
    res.json(admin.courses);
}));
router.delete('/courses/:id', authenticateAdmin, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const courseId = req.params.id;
    try {
        const course = yield Courses.findByIdAndDelete(courseId);
        if (course) {
            res.send({ message: "Successfully deleted the course" });
        }
        else {
            res.status(404).send({ message: "Course not found" });
        }
    }
    catch (error) {
        res.status(404).json({ message: "Course not found" });
    }
}));
module.exports = router;
