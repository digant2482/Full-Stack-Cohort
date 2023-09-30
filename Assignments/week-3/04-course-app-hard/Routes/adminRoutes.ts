import express, { response } from 'express';
import jwt from 'jsonwebtoken';
const { authenticateAdmin, secretKeyAdmin, validateAuthInputs } = require('../Authentication/Authentication');
const { Admins, Courses } = require('../Database/mongooseModels');
import { z } from 'zod';

const router = express.Router();

const validateCourseInputs = z.object({
    title: z.string().max(20),
    description: z.string().max(100),
    price: z.string().max(8),
    published: z.boolean(),
    imageLink: z.string().max(1000)
})

//Check login
router.get('/me', authenticateAdmin, async (req,res) => {
     res.json({username: req.headers['username']});
})


router.post('/signup', validateAuthInputs, async (req,res) => {
    const { username, password } = req.headers;
    const admin = await Admins.findOne({ username });
    if (admin){
        res.status(403).send("Username is taken, please try another username");
        return;
    }

    const newAdmin = new Admins({username, password});
    await newAdmin.save();

    //Send authorization token
    const token = jwt.sign({username, role: 'admin'}, secretKeyAdmin, {expiresIn : '1h'});
    res.send({message : "Admin created successfully", token});
})

router.post('/login', validateAuthInputs, async (req,res) => {
    const {username, password} = req.headers;
    const admin = await Admins.findOne({username, password});
    if (!admin){
        res.status(403).json({ message : 'Admin authentication failed'});
        return;
    }
    const token = jwt.sign({username}, secretKeyAdmin, { expiresIn: '1h'});
    res.send({message : "Logged in successfully", token});
})

router.post('/courses', authenticateAdmin, async (req,res) => {
    const parsedCourseInput = validateCourseInputs.safeParse(req.body);
    if (parsedCourseInput.success){
        const newCourse = new Courses(req.body);
        await newCourse.save();

        //Add courses to admin's course section
        const admin = await Admins.findOne({username : req.headers['username']});
        admin.courses.push(newCourse);
        await admin.save();

        res.send({message : "Course created successfully", courseId : newCourse.id});
    } else {
        res.status(403).send({message: parsedCourseInput.error});
    }
})

router.get('/courses/:courseId', authenticateAdmin, async (req,res) => {
    const courseId = req.params.courseId;
    try {
        const course = await Courses.findById(courseId);
        if (course){
            res.json(course);
        } else {
            res.status(403).send("Course not found");
        }
    } 
    catch {
        res.status(404).json({message: "Course not found"});
}
})

router.put('/courses/:courseId', authenticateAdmin, async (req,res) => {
    const parsedCourseInput = validateCourseInputs.safeParse(req.body);
    if (parsedCourseInput.success){
        try{
            const course = await Courses.findByIdAndUpdate(req.params.courseId, req.body);
            if (course){
                res.json({message : "Course updated successfully"});
            } else {
                res.status(403).json({message : "Invalid username or password"});
            }
        } 
        catch {
            res.status(404).json({message: "Course not found"});
        }
    } else {
        res.status(403).send({message: parsedCourseInput.error});
    }
})

router.get('/courses', authenticateAdmin, async (req,res) => {
    const admin = await Admins.findOne({username: req.headers['username']}).populate("courses");
    res.json(admin.courses);
   
})

router.delete('/courses/:id', authenticateAdmin, async (req, res) => {
    const courseId = req.params.id;
    try{
        const course = await Courses.findByIdAndDelete(courseId);
        if (course){
            res.send({message: "Successfully deleted the course"});
        } else {
            res.status(404).send({message: "Course not found"});
        }
    }
    catch (error) {
        res.status(404).json({message: "Course not found"});
    }
})

module.exports = router;