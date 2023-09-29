import express from 'express';
import mongoose from 'mongoose';
const app = express();
const port = 3000;
const cors = require("cors");
const adminRouter = require('./Routes/adminRoutes.js');
const usersRouter = require('./Routes/userRoutes.js');

app.use(express.json());
app.use(cors());
app.use('/admin', adminRouter);
app.use('/users', usersRouter);

//Connect with MongoDB
mongoose.connect("mongodb+srv://digantwork1:d2XgFkmpq9HYnihr@cluster0.rg11af8.mongodb.net/Courses");

//Start the server
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})