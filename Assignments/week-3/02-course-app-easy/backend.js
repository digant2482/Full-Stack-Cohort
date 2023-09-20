const express = require('express')
const fs = require('fs')
const bodyParser = require('body-parser')
const { send } = require('process')
const { match } = require('assert')
const app = express()
const port = 3000

app.use(bodyParser.json());

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

function authenticateAdmin(username, password){
    for (const admin of adminCredentialsArray){ 
        if (admin.username == username && admin.password == password){
            return true;
        } 
    }
    return false;
}

function authenticateUser(username, password){
    for (const user of userCredentialsArray){ 
        if (user.username == username && user.password == password){
            return true;
        } 
    }
    return false;
}

app.post('/admin/signup', (req,res) => {
    let newAdminCredentials = {};
    for (const admin of adminCredentialsArray){
        if (admin.username == req.body.username){
            res.status(400).send("Username is taken, please try another username");
            return;
        } 
    }

    newAdminCredentials['username'] = req.body.username;
    newAdminCredentials['password'] = req.body.password;
    adminCredentialsArray.push(newAdminCredentials);
    res.send("Admin created successfully");

    writeAdminCredentialsToDatabase();
})

app.post('/admin/login', (req,res) => {
    if (authenticateAdmin(req.headers.username, req.headers.password)){
        res.send("Logged in successfully");
    }else{
        res.status(401).send("Invalid Credentials");
    }    
})

app.post('/admin/courses', (req,res) => {
    let username = req.headers.username
    if (authenticateAdmin(username, req.headers.password)){
        let body = req.body;
        let id = Math.floor(Math.random() * 100000000);
        body['id'] = id;
        if (username in adminCourseArray){
            adminCourseArray[username][id] = body;
        }
        else {
            adminCourseArray[username] = {[id] : body};
        }  

        res.send({message: 'Course created successfully', courseId: id});
        writeAdminCoursesToDatabase();
    }
    else {
        res.status(401).send("Please login to publish the course");
    }
})

app.put('/admin/courses/:courseId', (req,res) => {
    let courseId = req.params.courseId;
    let username = req.headers.username;
    if (authenticateAdmin(username, req.headers.password)){
        let body = req.body;
        body['id'] = courseId;
        adminCourseArray[username][courseId] = body;
        res.send("Course updated successfully"); 
        writeAdminCoursesToDatabase(); 
    }
    else {
        res.status(401).send("Please login to update the course");
    }
})

app.get('/admin/courses', (req,res) => {
    let username = req.headers.username;
    if (authenticateAdmin(username, req.headers.password)){
        let courses = {};
        courses['courses'] = adminCourseArray[username];
        res.json(courses);
    }
    else {
        res.status(401).send("Please login to view your courses");
    } 
})

app.post('/users/signup', (req,res) => {
    let newUserCredentials = {};
    for (const user of userCredentialsArray){
        if (user.username == req.body.username){
            res.send(400).send("Username is taken, please try another");
            return;
        } 
    }

    newUserCredentials['username'] = req.body.username;
    newUserCredentials['password'] = req.body.password;
    userCredentialsArray.push(newUserCredentials);
    res.send("User created successfully");

    writeUserCredentialsToDatabase();
})

app.post('/users/login', (req,res) => {
    if (authenticateUser(req.headers.username, req.headers.password)){
        res.send("Logged in successfully");
    }else{
        res.status(401).send("Invalid Credentials");
    }    
})

//View all courses
app.get('/users/courses', (req,res) => {
    res.json(adminCourseArray);
})

//Purchase course
app.post('/users/courses/:courseId', (req,res) => {
    let username = req.headers.username;
    let courseId = req.params.courseId;
    let courseDetails = null;
    if (authenticateUser(username, req.headers.password)){
        for (const admin in adminCourseArray){
            for (const adminCourseId in adminCourseArray[admin]){
                if (adminCourseId == courseId){
                    courseDetails = adminCourseArray[admin][adminCourseId];
                }
            }
        }
        if (!courseDetails){
            res.status(404).send("Course doesn't exists");
            return;
        }

        if (username in userCourseArray){
            userCourseArray[username].push(courseDetails);
        }
        else{
            userCourseArray[username] = [courseDetails];
        }
        res.send("Course purchased successfully");
        writeUserCoursesToDatabase();
    }else{
        res.status(401).send("Invalid Credentials");
    }    
})

//View all purchased course
app.get('/users/purchasedCourses', (req,res) => {
    let courseId = req.params.courseId;
    let username = req.headers.username;
    if (authenticateUser(username, req.headers.password)){
        if (userCourseArray[username]){
            res.json(userCourseArray[username]); 
        }
        else {
            res.send("No courses purchased");
        }
    }
    else {
        res.status(401).send("Please login to check your purchases");
    }
})


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})