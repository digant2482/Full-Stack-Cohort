import React from "react";
import axios from "axios";
import { NavigateFunction, useNavigate } from "react-router-dom";
import { Button, Typography, Card} from '@mui/material';
import { courseSchema } from "ui";

function ShowCourses() {
    const [courses, setCourses] = React.useState<courseSchema[]>([]);
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
        <Typography variant="h4" style={{display: "flex", justifyContent: "center", marginTop: 20}}>Courses</Typography>
        <br />
        <div style = {{
            display: 'flex',
            justifyContent: 'center',
        }}>
            {courses.map(c => <Course title={c.title}
            description={c.description}
            price={c.price}
            key={c.id}
            id={c.id}
            navigate={navigate} />)}  
         </div>
         <div style={{display: "flex", justifyContent: "center", marginTop: 20}}>
            <Button variant={'contained'} onClick={()=>{navigate('/purchasedcourses')}}>View my purchases</Button>   
         </div>   
    </div>
}

interface courseComponent extends courseSchema {
    navigate: NavigateFunction;
}

function Course(props: courseComponent) {
    return <Card variant={"outlined"} style = {{width: 300, padding: 20}}>
        <Typography>Title: {props.title}</Typography>
        <br />  
        <Typography>Description: {props.description}</Typography>
        <br />
        <Typography>Price: {props.price.toString()}</Typography>
        <br />
        <Button variant={'contained'} onClick = {() => {props.navigate(`/courses/${props.id}`)}}>Purchase Course</Button>
        <br />
    </Card>
}

export default ShowCourses;