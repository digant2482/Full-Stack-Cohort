const express = require('express');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const app = express();
const port = 3000;

const secretKeyAdmin = "adminS3CR3T";
const secretKeyUser = "userS3CR3T";

app.use(express.json());

//Define mongoose schemas
const userSchema = new mongoose.Schema({
    username : String,
    password : String,
    purchasedCourses : [{ type : mongoose.Schema.Types.ObjectId, ref: "Course"}]
})

const adminSchema = new mongoose.Schema({
    username : String,
    password : String,
})

const courseSchema = new mongoose.Schema({
    title : String,
    description : String,
    price : Number,
    imageLink : String,
    published : Boolean
})

//Define mongoose models
const Users = mongoose.model("Users", userSchema);
const Admins = mongoose.model("Admins", adminSchema);
const Courses = mongoose.model("Courses", courseSchema);

//Connect with MongoDB
mongoose.connect("mongodb+srv://digantwork1:d2XgFkmpq9HYnihr@cluster0.rg11af8.mongodb.net/Courses", {useNewUrlParser : true, useUnifiedTopology : true});

//Authentication tokens
function authenticateAdmin(req, res, next){
    const authToken = req.headers.token.split(" ")[1];
    try {
        const decryptedObject = jwt.verify(authToken, secretKeyAdmin);
        req.user = decryptedObject.username;
        next();
    }
    catch (err){
        res.status(403).json({ message : 'Admin authentication failed'});
    }    
}

function authenticateUser(req, res, next){
    const authToken = req.headers.token.split(" ")[1];
    try{
        const decryptedObject = jwt.verify(authToken, secretKeyAdmin);
        req.user = decryptedObject.username;
        next();
    }
    catch {
        res.status(403).json({ message : 'User authentication failed'});
    }
}

app.post('/admin/signup', async (req,res) => {
    const { username, password } = req.body;
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

app.post('/admin/login', async (req,res) => {
    const {username, password} = req.headers;
    const admin = await Admins.findOne({username, password});
    if (!admin){
        res.status(403).json({ message : 'Admin authentication failed'});
        return;
    }
    const token = jwt.sign({username}, secretKeyAdmin, { expiresIn: '1h'});
    res.send({message : "Logged in successfully", token});
})

app.post('/admin/courses', authenticateAdmin, async (req,res) => {
    const newCourse = new Courses(req.body);
    await newCourse.save();
    res.send({message : "Course created successfully", courseId : newCourse.id});
})

app.put('/admin/courses/:courseId', authenticateAdmin, async (req,res) => {
    const course = await Courses.findByIdAndUpdate(req.params.courseId, req.body);
    if (course){
        res.json({message : "Course updated successfully"});
    } else {
        res.status(403).json({message : "Invalid username or password"});
    }
})

app.get('/admin/courses', authenticateAdmin, async (req,res) => {
    const courses = await Courses.find({});
    res.json({courses});
})

app.post('/users/signup', authenticateUser, async (req,res) => {
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

app.post('/users/login', authenticateUser, async (req,res) => {
    const {username, password} = req.headers;
    const user = await Users.findOne({username, password});
    if (!user){
        res.status(403).json({ message : 'User authentication failed'});
        return;
    }
    const token = jwt.sign({username}, secretKeyUser, {expiresIn : '1h'});
    res.json({message : "Logged in successfully", token});
})

//View all courses
app.get('/users/courses', authenticateUser, async (req,res) => {
    const courses = await Courses.find({published : true});
    res.json(courses);
})

//Purchase course
app.post('/users/courses/:courseId', authenticateUser, async (req,res) => {
    let courseId = req.params.courseId;
    const course = await Courses.findById(courseId);
    if (course){
        const user = await Users.findOne({username : req.user.username});
        if (user){
            user.purchasedCourses.push(course);
            await user.save();
            res.json({message : "Course purchased successfully"});
        } else {
            res.status(403).json({message : "User not found"});
        }
    } else {
        res.status(404).json({message : "Course not found"});
    }
})

//View all purchased course
app.get('/users/purchasedCourses', authenticateUser, async (req,res) => {
    const user = await Users.findOne({username : req.user.username}).populate("Purchased Course");
    if (user){
        res.json({purchasedCourses: user.purchasedCourses || []});
    } else {
        res.status(403).json({message : "User not found"});
    }    
})


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})