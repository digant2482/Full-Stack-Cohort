"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const app = (0, express_1.default)();
const port = 3000;
const cors = require("cors");
const adminRouter = require('./Routes/adminRoutes.js');
const usersRouter = require('./Routes/userRoutes.js');
app.use(express_1.default.json());
app.use(cors());
app.use('/admin', adminRouter);
app.use('/users', usersRouter);
//Connect with MongoDB
mongoose_1.default.connect("mongodb+srv://digantwork1:d2XgFkmpq9HYnihr@cluster0.rg11af8.mongodb.net/Courses");
//Start the server
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});
