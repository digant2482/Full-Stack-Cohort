import { NextApiRequest, NextApiResponse } from "next";
import { Courses, Users } from "db";
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
                purchaseCourse(req,res);
            }
        })
    }
}

async function purchaseCourse(
    req: NextApiRequest,
    res: NextApiResponse<Data>
) {
    let courseId = req.query.courseId;
    try {
        const course = await Courses.findById(courseId);
        const user = await Users.findOne({username : req.headers['username']});
        if (user){
            user.purchasedCourses.push(course);
            await user.save();
            res.json({message : "Course purchased successfully"});
        } else {
            res.status(403).json({message : "User not found"});
        }
    }
    catch (error) {
        res.status(404).json({message: "Course doesn't exist"});
    }
}