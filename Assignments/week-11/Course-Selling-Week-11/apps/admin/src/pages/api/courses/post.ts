import { NextApiRequest, NextApiResponse } from "next";
import { Admins, Courses } from "db";
import { inputValidationCourseSchema } from "@/lib/middleware";
import dbConnect from "@/lib/db";
import { getUser } from "@/lib/middleware";
import { JwtPayload } from "jsonwebtoken";

export default async function handler (
    req: NextApiRequest,
    res: NextApiResponse
) {
    await dbConnect();
    const authHeader = req.headers.token;
    if (typeof authHeader === 'string') {
        const token = authHeader.split(" ")[1];
        getUser(token, async (userId: string | JwtPayload)=>{
            if (!userId) {
                res.status(403).json({});
            } else {
                createCourse(req,res);
            }
        })
    }
}

async function createCourse(
    req: NextApiRequest,
    res: NextApiResponse
){
    const parsedCourseInput = inputValidationCourseSchema.safeParse(req.body);
    if (parsedCourseInput.success){
        const newCourse = new Courses(req.body);
        await newCourse.save();

        //Add courses to admin's course section
        const admin = await Admins.findOne({username : req.headers['username']});
        admin.courses.push(newCourse);
        await admin.save();

        res.send({message : "Course created successfully", courseId : newCourse.id});
    } else {
        res.status(403).send({message: parsedCourseInput.error});
    }
}