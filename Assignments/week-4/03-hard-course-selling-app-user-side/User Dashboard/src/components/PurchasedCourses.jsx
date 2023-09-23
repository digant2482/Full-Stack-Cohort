import React from "react";
import axios from "axios";

function ShowCourses() {
    const [courses, setCourses] = React.useState([]);
    const authKey = localStorage.getItem("Auth-Key-User");
    const token = "Bearer " + authKey;

    React.useEffect(() => {
        axios.get("http://localhost:3000/users/purchasedCourses", {headers : { token : token }}).then((response) => {
        console.log(response.data)
        if (response.status === 200)
            setCourses(response.data);
        else 
            navigate("/login");
    })}, []);
  
    return <div>
        <h1>Your Courses</h1>
        <br />
        {courses.map(c => <Course title={c.title}
         description={c.description}
         key={c.id} />)}
    </div>
}

function Course(props) {
    return <div>
        <h3>Title - {props.title}</h3>
        <h4>Description - {props.description}</h4>
        <br/>
    </div>
}

export default ShowCourses;