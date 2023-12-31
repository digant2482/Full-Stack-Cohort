import React from "react";
import axios from "axios";
import { useRouter } from "next/router";
import { Button, Typography, Card} from '@mui/material';
import { courseSchema } from "ui";

interface courseSchemaWithId extends courseSchema {
    _id: string;
}

function ShowCourses() {
    const [courses, setCourses] = React.useState<courseSchemaWithId[]>([]);
    const router = useRouter();

    React.useEffect(() => {
        const authKey = localStorage.getItem("Auth-Key-User");
        const token = "Bearer " + authKey;
        axios.get("http://localhost:3000/api/courses/get", {headers : { token }}).then((response) => {
            if (response.status === 200)
                setCourses(response.data);
            else 
                router.push("/login");
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
            key={c._id}
            imageLink={c.imageLink}
            published={c.published}
            _id={c._id}
            />)}  
         </div>
         <div style={{display: "flex", justifyContent: "center", marginTop: 20}}>
            <Button variant={'contained'} onClick={()=>{router.push('/purchasedcourses')}}>View my purchases</Button>   
         </div>   
    </div>
}

function Course(props: courseSchemaWithId) {
    const router = useRouter();
    return <Card variant={"outlined"} style = {{width: 300, padding: 20}}>
        <Typography>Title: {props.title}</Typography>
        <br />  
        <Typography>Description: {props.description}</Typography>
        <br />
        <Typography>Price: {props.price.toString()}</Typography>
        <br />
        <Button variant={'contained'} onClick = {() => {router.push(`/courses/${props._id}`)}}>Purchase Course</Button>
        <br />
    </Card>
}

export default ShowCourses;