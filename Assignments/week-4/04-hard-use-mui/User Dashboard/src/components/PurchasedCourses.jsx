import React from "react";
import axios from "axios";
import { Button, Typography, Card } from '@mui/material';

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
        <Typography variant={"h4"} style={{display: 'flex', justifyContent: 'center'}}>Your Courses</Typography>
        <br />
            {courses.map(c => <Course title={c.title}
            description={c.description}
            key={c.id} />)}
    </div>
}

function Course(props) {
    return <div style={{display: 'flex', justifyContent: 'center', marginBottom: 10}}>
    <Card variant={"outlined"} style = {{width: 300, padding: 20}}>
    <Typography>Title: {props.title}</Typography>
    <Typography>Description: {props.description}</Typography>   
</Card>
</div>
}

export default ShowCourses;