import mongoose from 'mongoose';

const connection = {
    isConnected: false
};

async function dbConnect() {
  if (connection.isConnected) {
    return;
  }

  let db = await mongoose.connect("mongodb+srv://digantwork1:d2XgFkmpq9HYnihr@cluster0.rg11af8.mongodb.net/Courses");
  connection.isConnected = true;
}

export default dbConnect;