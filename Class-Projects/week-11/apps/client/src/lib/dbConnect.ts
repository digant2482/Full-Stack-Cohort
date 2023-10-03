import mongoose from 'mongoose';
let alreadyDone = false;

export async function ensureDbconnection(){
    if (alreadyDone){
        return;
    }
    alreadyDone = true;
    mongoose.connect("mongodb+srv://digantwork1:d2XgFkmpq9HYnihr@cluster0.rg11af8.mongodb.net/Courses");
}