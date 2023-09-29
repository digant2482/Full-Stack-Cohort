import React from "react";
import axios from "axios";
import { useParams,useNavigate } from "react-router-dom";
import { Card, Typography, Button } from "@mui/material";
import { courseSchema } from "ui";

function CourseDetails () {
    const {courseId} = useParams();
    const [course, setCourse] = React.useState<courseSchema>();
    const authKey = localStorage.getItem("Auth-Key-User");
    const token = "Bearer " + authKey;
    const navigate = useNavigate();

    React.useEffect(() => {
        axios.get("http://localhost:3000/users/courses/" + courseId, {headers:{token}}).then((response) => {
        if (response.status === 200){
            setCourse(response.data);
        }
    })

    }, [])

    const purchaseCourse = () => {
        axios.post("http://localhost:3000/users/courses/" + courseId, null, {headers : { token }}).then((response) => {
            if (response.status === 200){
                navigate("/courses");
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