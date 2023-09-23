import React from "react";
import axios from "axios";
import { useParams,useNavigate } from "react-router-dom";

function CourseDetails () {
    const {courseId} = useParams();
    const [course, setCourse] = React.useState({});
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
        <h2>{course.title}</h2>
        <h3>{course.description}</h3>
        <h3>{course.price}</h3>
        <button onClick={purchaseCourse}>Purchase course</button>
        <br />
    </div>
}

export default CourseDetails