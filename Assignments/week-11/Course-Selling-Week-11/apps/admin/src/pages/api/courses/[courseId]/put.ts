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
                updateCourse(req,res);
            }
        })
    }
}

async function updateCourse(
    req: NextApiRequest,
    res: NextApiResponse<Data>
) {
    const parsedCourseInput = inputValidationCourseSchema.safeParse(req.body);
    if (parsedCourseInput.success){
        try{
            const course = await Courses.findByIdAndUpdate(req.query.courseId, req.body);
            if (course){
                res.json({message : "Course updated successfully"});
            } else {
                res.status(403).json({message : "Invalid username or password"});
            }
        } 
        catch {
            res.status(404).json({message: "Course not found"});
        }
    } else {
        res.status(403).send({message: parsedCourseInput.error.toString()});
    }
}