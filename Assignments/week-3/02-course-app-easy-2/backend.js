const express = require('express')
const fs = require('fs')
const bodyParser = require('body-parser')
const jwt = require('jsonwebtoken')
const app = express()
const port = 3000
const secretKeyAdmin = "adminS3CR3T";
const secretKeyUser = "userS3CR3T";

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

//Authentication tokens
function authenticateAdmin(req, res){
    const authToken = req.headers.token.split(" ")[1];
    try {
        var decryptedObject = jwt.verify(authToken, secretKeyAdmin);
    }
    catch {
        res.status(403).json({ message : 'Admin authentication failed'});
        return;
    }
    const admin = adminCredentialsArray.find((item) => {
        return item.username === decryptedObject.username;
    })
    return admin.username;
}

function authenticateUser(req, res){
    const authToken = req.headers.token.split(" ")[1];
    try{
        var decryptedObject = jwt.verify(authToken, secretKeyUser);
    }
    catch {
        res.status(403).json({ message : 'User authentication failed'});
        return;
    }
    const user = userCredentialsArray.find((item) => {
        return item.username === decryptedObject.username;
    })
    return user.username;
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
    const authToken = jwt.sign({username : req.body.username}, secretKeyAdmin, {expiresIn : '1h'});
    res.send(authToken);

    writeAdminCredentialsToDatabase();
})

app.post('/admin/login', (req,res) => {
    const {username, password} = req.headers;
    console.log(username);
    console.log(password);
    const admin = adminCredentialsArray.find(item => 
        item.username === username && item.password === password)
    console.log(admin);
    if (!admin){
        res.status(403).json({ message : 'Admin authentication failed'});
        return;
    }
    const authToken = jwt.sign({username : username}, secretKeyAdmin, { expiresIn: '1h' });
    res.send(authToken);
})

app.post('/admin/courses', (req,res) => {
    let username = authenticateAdmin(req,res);
    if (username){
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
})

app.put('/admin/courses/:courseId', (req,res) => {
    let username = authenticateAdmin(req,res);
    if (username){
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
    } 
})

app.get('/admin/courses', (req,res) => {
    let username = authenticateAdmin(req,res);
    if (username){
        let courses = {};
        courses['courses'] = adminCourseArray[username];
        res.json(courses);
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
    const authToken = jwt.sign({username : req.body.username}, secretKeyUser, {expiresIn : "1h"});
    res.send(authToken);

    writeUserCredentialsToDatabase();
})

app.post('/users/login', (req,res) => {
    const {username, password} = req.headers;
    const user = userCredentialsArray.find(item => 
        item.username === username && item.password === password)
    if (!user){
        res.status(403).json({ message : 'User authentication failed'});
        return;
    }
    const authToken = jwt.sign({username : username}, secretKeyUser, {expiresIn : '1h'});
    res.send(authToken);
})

//View all courses
app.get('/users/courses', (req,res) => {
    if (authenticateUser(req,res)){
        res.json(adminCourseArray);
    }
})

//Purchase course
app.post('/users/courses/:courseId', (req,res) => {
    let username = authenticateUser(req,res);
    if (username){
        let courseId = req.params.courseId;
        let courseDetails = null;
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
    }
})

//View all purchased course
app.get('/users/purchasedCourses', (req,res) => {
    let username = authenticateUser(req, res);
    if (username){
        if (userCourseArray[username]){
            res.json(userCourseArray[username]); 
        }
        else {
            res.send("No courses purchased");
        }   
    }
})


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})