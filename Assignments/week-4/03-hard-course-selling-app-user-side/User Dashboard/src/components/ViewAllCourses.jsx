import React from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function ShowCourses() {
    const [courses, setCourses] = React.useState([]);
    const authKey = localStorage.getItem("Auth-Key-User");
    const token = "Bearer " + authKey;
    const navigate = useNavigate();

    React.useEffect(() => {
        axios.get("http://localhost:3000/users/courses", {headers : { token }}).then((response) => {
            console.log(response.data);
            if (response.status === 200)
                setCourses(response.data);
            else 
                navigate("/login");
    })}, []);
  
    return <div>
        <h1>All Courses</h1>
        <br />
        {courses.map(c => <Course title={c.title}
         description={c.description}
         price={c.price}
         key={c.id}
         id={c.id}
         navigate={navigate} />)}  
         <br />
         <button onClick={()=>{navigate('/purchasedcourses')}}>View my purchases</button>      
    </div>
}

function Course(props) {
    return <div>
        Title - <emp>{props.title}</emp>
        <br />  
        Description - {props.description}
        <br />
        Price - {props.price.toString()}
        <br />
        <button onClick = {() => {props.navigate(`/courses/${props.id}`)}}>Purchase Course</button>
        <br />
    </div>
}

export default ShowCourses;