const express = require('express')
const fs = require('fs')
const bodyParser = require('body-parser')
const jwt = require('jsonwebtoken')
const app = express()
const cors = require("cors")
const port = 3000
const secretKeyAdmin = "adminS3CR3T";
const secretKeyUser = "userS3CR3T";

app.use(bodyParser.json());
app.use(cors());

//Read admin credentials from file
try{
    let data = fs.readFileSync("adminCredentials.json", 'utf-8');
    var adminCredentialsArray = JSON.parse(data);
}
catch (err){console.log('Failed to read adminCredentials.json');}

//Read admin course data from file
try{
    let data = fs.readFileSync("adminCourses.json", 'utf-8');
    var adminCourseArray = JSON.parse(data);
}
catch (err){console.log('Failed to read adminCourses.json');}

//Read user credentials from file
try{
    let data = fs.readFileSync("userCredentials.json", 'utf-8');
    var userCredentialsArray = JSON.parse(data);
}
catch (err){console.log('Failed to read userCredentials.json');}

//Read user course data from file
try{
    let data = fs.readFileSync("userCourses.json", 'utf-8');
    var userCourseArray = JSON.parse(data);
}
catch (err){console.log('Failed to read userCourses.json');}

function writeAdminCredentialsToDatabase(){
    const jsonData = JSON.stringify(adminCredentialsArray);
    fs.writeFile("adminCredentials.json", jsonData, (err) => {
        if (err) console.log("Could not write admin credentials to file");
    })
}

function writeAdminCoursesToDatabase(){
    const jsonData = JSON.stringify(adminCourseArray);
    fs.writeFile("adminCourses.json", jsonData, (err) => {
        if (err) {
            console.log("Could not write admin courses to file");
        }
    })
}

function writeUserCredentialsToDatabase(){
    const jsonData = JSON.stringify(userCredentialsArray);
    fs.writeFile("userCredentials.json", jsonData, (err) => {
        if (err) console.log("Could not write user credentials to file");
    })
}

function writeUserCoursesToDatabase(){
    const jsonData = JSON.stringify(userCourseArray);
    fs.writeFile("userCourses.json", jsonData, (err) => {
        if (err) {
            console.log("Could not write user courses to file");
        }
    })
}

//Authentication tokens
function authenticateAdmin(req, res, next){
    const authToken = req.headers.token.split(" ")[1];
    try {
        const decryptedObject = jwt.verify(authToken, secretKeyAdmin);
        req.user = decryptedObject;
        next();
    }
    catch (err){
        res.status(403).json({ message : 'Admin authentication failed'});
    }    
}

function authenticateUser(req, res, next){
    const authToken = req.headers.token.split(" ")[1];
    try{
        const decryptedObject = jwt.verify(authToken, secretKeyUser);
        req.user = decryptedObject;
        next();
    }
    catch {
        res.status(403).json({ message : 'User authentication failed'});
    }
}

app.post('/admin/signup', (req,res) => {
    const { username, password } = req.body;
    for (const admin of adminCredentialsArray){
        if (admin.username === username){
            res.status(400).send("Username is taken, please try another username");
            return;
        } 
    }

    adminCredentialsArray.push({ username, password});
    //Send authorization token
    const token = jwt.sign({username, role: 'admin'}, secretKeyAdmin);
    res.send({message : "Admin created successfully", token});

    writeAdminCredentialsToDatabase();
})

app.post('/admin/login', (req,res) => {
    const {username, password} = req.headers;
    const admin = adminCredentialsArray.find(item => 
        item.username === username && item.password == password)
    if (!admin){
        res.status(403).json({ message : 'Admin authentication failed'});
        return;
    }
    const token = jwt.sign({username}, secretKeyAdmin);
    res.send({message : "Logged in successfully", token});
})

app.post('/admin/courses', authenticateAdmin, (req,res) => {
    const username = req.user.username;
    let body = req.body;
    let id = Math.floor(Math.random() * 100000000);
    body['id'] = id;

    if (username in adminCourseArray)
        adminCourseArray[username][id] = body;
    else 
        adminCourseArray[username] = {[id] : body};

    res.send({message: 'Course created successfully', courseId: id});
    writeAdminCoursesToDatabase();
})

app.get('/admin/courses/:courseId', authenticateAdmin, (req,res) => {
    let username = req.user.username;
    let courseId = req.params.courseId;
    for (const key in adminCourseArray[username]){
        if (key === courseId){ 
            res.send(adminCourseArray[username][courseId]); 
            return;
        }
    }
    res.status(403).send("Course not found");
})

app.put('/admin/courses/:courseId', authenticateAdmin, (req,res) => {
    let username = req.user.username;
    let courseId = req.params.courseId;
    for (const key in adminCourseArray[username]){
        if (key === courseId){
            let body = req.body;
            body['id'] = courseId;
            adminCourseArray[username][courseId] = body;
            res.send("Course updated successfully"); 
            writeAdminCoursesToDatabase(); 
            return;
        }
    }
    res.status(403).send("Course not found");
})

app.get('/admin/courses', authenticateAdmin, (req,res) => {
    let courses = {};
    courses['courses'] = adminCourseArray[req.user.username];
    res.json(courses);   
})

app.delete('/admin/courses/:id', authenticateAdmin, (req, res) => {
    const username = req.user.username;
    const id = req.params.id;
    for (courseId in adminCourseArray[username]){
        if (courseId == id){
            delete adminCourseArray[username][courseId];
            writeAdminCoursesToDatabase(); 
            res.send({message: "Course deleted successfully", courses : adminCourseArray[username]});
            return;
        }
    }
    res.status(404).send("Course not found");
})




app.post('/users/signup', (req,res) => {
    const { username, password } = req.body;
    for (const user of userCredentialsArray){
        if (user.username == username){
            res.status(400).send({message: "Username is taken, please try another"});
            return;
        } 
    }

    userCredentialsArray.push({username, password});
    //Send authorization token
    const token = jwt.sign({username, role: 'user'}, secretKeyUser);
    res.send({message : "User created successfully", token});

    writeUserCredentialsToDatabase();
})

app.post('/users/login', (req,res) => {
    const {username, password} = req.headers;
    const user = userCredentialsArray.find(item => 
        item.username === username && item.password === password)
    if (!user){
        res.status(403).json({ message : 'Invalid email or password'});
        return;
    }
    const token = jwt.sign({username}, secretKeyUser);
    res.json({message : "Logged in successfully", token});
})

//Check login
app.get('/users/me', authenticateUser, (req, res)=>{
    res.send({email : req.user.username});
})

//View all courses
app.get('/users/courses', authenticateUser, (req,res) => {
    let courses = [];
    for (admin in adminCourseArray){
        for (courseId in adminCourseArray[admin]){
            if (adminCourseArray[admin][courseId].published === 'true'){
                console.log(adminCourseArray[admin][courseId]);
                courses.push(adminCourseArray[admin][courseId]);
            }
        }
    }
    res.json(courses);;
})

//View course by course Id
app.get('/users/courses/:courseId', authenticateUser, (req,res) => {
    let courseId = req.params.courseId;
    let courseDetails = null;
    for (key in adminCourseArray){
        for (course in adminCourseArray[key]){
            if (course == courseId)
                courseDetails = adminCourseArray[key][course];
        }
    }

    if (courseDetails){
        res.send(courseDetails);
    } else {
        res.status(404).send("Course doesn't exists");
    }
})

//Purchase course
app.post('/users/courses/:courseId', authenticateUser, (req,res) => {
    let username = req.user.username;
    let courseId = req.params.courseId;
    let courseDetails = null;
    for (key in adminCourseArray){
        for (course in adminCourseArray[key]){
            if (course == courseId)
                courseDetails = adminCourseArray[key][course];
        }
    }
    if (courseDetails){
        if (username in userCourseArray)
            userCourseArray[username].push(courseDetails);
        else
            userCourseArray[username] = [courseDetails];

        res.send("Course purchased successfully");
        writeUserCoursesToDatabase();
    } else {
        res.status(404).send("Course doesn't exists");
        return;
    }
})

//View all purchased course
app.get('/users/purchasedCourses', authenticateUser, (req,res) => {
    if (userCourseArray[req.user.username])
        res.json(userCourseArray[req.user.username]); 
    else 
        res.send("No courses purchased");    
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})