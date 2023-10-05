import { NextApiRequest, NextApiResponse } from "next";
import { Courses } from "db";
import dbConnect from "@/lib/db";
import { getUser } from "@/lib/middleware";
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
                deleteCourse(req,res);
            }
        })
    }
}

async function deleteCourse(
    req: NextApiRequest,
    res: NextApiResponse<Data>
) {
    const { courseId } = req.query;;
    try{
        const course = await Courses.findByIdAndDelete(courseId);
        if (course){
            res.send({message: "Successfully deleted the course"});
        } else {
            res.status(404).send({message: "Course not found"});
        }
    }
    catch (error) {
        res.status(404).json({message: "Course not found"});
    }
}