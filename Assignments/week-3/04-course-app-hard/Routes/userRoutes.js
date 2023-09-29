const jwt = require('jsonwebtoken');
const { authenticateUser, secretKeyUser } = require("../Authentication/Authentication");
const { Users, Courses } = require("../Database/mongooseModels");
const express = require('express');

const router = express.Router();

router.post('/signup', async (req,res) => {
    const { username, password } = req.body;
    const user = await Users.findOne({ username });
    if (user){
        res.status(403).send("Username is taken, please try another username");
        return;
    }

    const newUser = new Users({username, password});
    await newUser.save();

    //Send authorization token
    const token = jwt.sign({username, role: 'user'}, secretKeyUser, {expiresIn : '1h'});
    res.send({message : "User created successfully", token});
})

router.post('/login', async (req,res) => {
    const {username, password} = req.headers;
    const user = await Users.findOne({username, password});
    if (!user){
        res.status(403).json({ message : 'User authentication failed'});
        return;
    }
    const token = jwt.sign({username}, secretKeyUser, {expiresIn : '1h'});
    res.json({message : "Logged in successfully", token});
})

//Check login
router.get('/me', authenticateUser, async (req,res) => {
    res.json({username: req.user.username});
})

//View all courses
router.get('/courses', authenticateUser, async (req,res) => {
    const courses = await Courses.find({published : true});
    res.json(courses);
})

//View course by course Id
router.get('/courses/:courseId', authenticateUser, async (req,res) => {
    try {
        let courseId = req.params.courseId;
        const course = await Courses.findById(courseId);
        if (course){
            res.send(course);
        } else {
            res.status(404).json({message: "Course not found"});
        }
    }
    catch (error) {
        res.status(404).json({message: error.message});
    }
})

//Purchase course
router.post('/courses/:courseId', authenticateUser, async (req,res) => {
    let courseId = req.params.courseId;
    try {
        const course = await Courses.findById(courseId);
        const user = await Users.findOne({username : req.user.username});
        if (user){
            user.purchasedCourses.push(course);
            await user.save();
            res.json({message : "Course purchased successfully"});
        } else {
            res.status(403).json({message : "User not found"});
        }
    }
    catch (error) {
        res.status(404).json({message: error.message});
    }
})

//View all purchased course
router.get('/purchasedCourses', authenticateUser, async (req,res) => {
    const user = await Users.findOne({username : req.user.username}).populate("purchasedCourses");
    if (user){
        res.json({purchasedCourses: user.purchasedCourses || []});
    } else {
        res.status(403).json({message : "User not found"});
    }    
})

module.exports = router;