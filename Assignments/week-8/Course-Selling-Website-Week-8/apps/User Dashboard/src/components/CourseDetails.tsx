import React from "react";
import axios from "axios";
import { useParams,useNavigate } from "react-router-dom";
import { Card, Typography } from "@mui/material";
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
        <Card>
            <Typography>{course.title}</Typography>
            <Typography>{course.description}</Typography>
            <Typography>{course.price}</Typography>
            <button onClick={purchaseCourse}>Purchase course</button>
            <br />
        </Card>
        }
    </div>
}

export default CourseDetails