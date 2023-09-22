import React from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function ShowCourses() {
    const [courses, setCourses] = React.useState([]);
    const authKey = localStorage.getItem("Auth-Key");
    const token = "Bearer " + authKey;
    const navigate = useNavigate();

    React.useEffect(() => {
        axios.get("http://localhost:3000/admin/courses", {headers : { token : token }}).then((response) => {
        if (response.status == 200){
            setCourses(response.data['courses']);
        }
        else {
            navigate("/login");
        }
    })}, []);

    function deleteCourse(courseId) {
        axios.delete(`http://localhost:3000/admin/courses/${courseId}`, {headers : { token : token }}).then((response) => {
            console.log(response);
            if (response.status == 200){
                setCourses(response.data['courses']);
            }
        })
    }
  
    return <div>
        <h1>Your Courses</h1>
        <br />
        {Object.values(courses).map(c => <Course title={c.title}
         description={c.description}
         published={c.published}
         id = {c.id}
         deleteCourse={deleteCourse}
         navigate={navigate} />)}

        <h1>Create new course</h1>
        <button onClick = {() => {navigate("/createcourse")}}>Create New Course</button>
    </div>
}

function Course(props) {
    return <div>
        Title - <emp>{props.title}</emp>
        <br />  
        Description - {props.description}
        <br />
        Published - {props.published.toString()}
        <br />
        <br />
        <button onClick = {() => {props.navigate(`/courses/${props.id}`)}}>Update Course</button>
        <button onClick = {() => {props.deleteCourse(props.id)}}>Delete Course</button>
    </div>
}

export default ShowCourses;