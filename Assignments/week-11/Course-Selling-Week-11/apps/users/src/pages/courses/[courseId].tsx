import React from "react";
import axios from "axios";
import { Card, Typography, Button } from "@mui/material";
import { courseSchema } from "ui";
import { useRouter } from "next/router";

function CourseDetails () {
    const [course, setCourse] = React.useState<courseSchema>();
    const router = useRouter();
    const courseId = router.query.courseId;

    let token:string = "";
    React.useEffect(() => {
        if (courseId) {
            const authKey = localStorage.getItem("Auth-Key-User");
            token = "Bearer " + authKey;

            axios.get("http://localhost:3000/api/courses/fetchcourses/" + courseId, {headers:{token}}).then((response) => {
            if (response.status === 200){
                setCourse(response.data);
            }})
        }
    }, [courseId])

    const purchaseCourse = () => {
        axios.post("http://localhost:3000/api/courses/purchasecourse/" + courseId, null, {headers : { token : "Bearer " + localStorage.getItem("Auth-Key-User") }}).then((response) => {
            if (response.status === 200){
                router.push("/courses");
            }
        })
    }

    return  <div>
        {course &&
        <div style={{width:300, display: "flex", justifyContent:"center"}}>
            <Card style={{width: "100%"}}>
                <Typography style={{display:"flex", justifyContent:"center"}}>{course.title}</Typography>
                <br />
                <div style={{display:"flex", justifyContent:"center", height: 90}}>
                <img style={{display:"flex", justifyContent:"center", height: 90}} src={"https://www.interviewbit.com/blog/wp-content/uploads/2022/05/FULL-STACK-1.png"} alt="Course Image"/>
                </div>
                <br />
                <Typography style={{display:"flex", justifyContent:"center"}}>{course.description}</Typography>
                <br />
                <Typography style={{display:"flex", justifyContent:"center"}}>₹ {course.price}</Typography>
                <br />
                <div style={{display:"flex", justifyContent:"center"}}>
                    <Button size={"small"} variant={"contained"} onClick={purchaseCourse}>Purchase course</Button>
                </div>
            </Card>
        </div>
        }
    </div>
}

export default CourseDetails