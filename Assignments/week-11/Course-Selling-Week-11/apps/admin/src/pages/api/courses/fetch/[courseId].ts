import { NextApiRequest, NextApiResponse } from "next";
import { Courses } from "db";
import dbConnect from "@/lib/db";
import { getUser, inputValidationCourseSchema } from "@/lib/middleware";
import { JwtPayload } from "jsonwebtoken";

type Data = {
    message: string
}
export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<Data>
){
    await dbConnect();
    const authHeader = req.headers.token;
    if (typeof authHeader === 'string') {
        const token = authHeader.split(" ")[1];
        getUser(token, async (userId: string | JwtPayload)=>{
            if (!userId) {
                res.status(403).send({message: "Invalid credentials"});
            } else {
                fetchCourse(req,res);
            }
        })
    }
}

async function fetchCourse(
    req: NextApiRequest,
    res: NextApiResponse<Data>
) {
    const courseId = req.query.courseId;
    try {
        const course = await Courses.findById(courseId);
        if (course){
            res.json(course);
        } else {
            res.status(403).send({message: "Course not found"});
        }
    } 
    catch {
        res.status(404).json({message: "Course not found"});
    }
}