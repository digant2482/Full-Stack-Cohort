import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    username : String,
    password : String,
    purchasedCourses : [{ type : mongoose.Schema.Types.ObjectId, ref: "Courses"}]
})

const adminSchema = new mongoose.Schema({
    username : String,
    password : String,
    courses: [{ type : mongoose.Schema.Types.ObjectId, ref: "Courses" }]
})

const courseSchema = new mongoose.Schema({
    title : String,
    description : String,
    price : String,
    imageLink : String,
    published : Boolean
})

//Define mongoose models
export const Users = mongoose.model("Users", userSchema);
export const Admins = mongoose.model("Admins", adminSchema);
export const Courses = mongoose.model("Courses", courseSchema);