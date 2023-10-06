import React from "react";
import axios from "axios";
import { useRouter } from "next/router";
import { Button, Typography, Card} from '@mui/material';
import { courseSchema } from "ui";

interface courseSchemaWithID extends courseSchema {
    _id: string;
}

function ShowCourses() {
    const [courses, setCourses] = React.useState<courseSchemaWithID[]>([]);
    const router = useRouter();

    React.useEffect(() => {
        const authKey = localStorage.getItem("Auth-Key");
        const token = "Bearer " + authKey;
        axios.get("/api/courses/get", {headers : { token }}).then((response) => {
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
            flexWrap: 'wrap',
            justifyContent: 'center',
        }}>
            {courses.map(c => <Course title={c.title}
            description={c.description}
            price={c.price}
            imageLink={c.imageLink}
            published={c.published}
            key={c._id}
            _id={c._id}
         />)}  
         </div>
         <div style={{display: "flex", justifyContent: "center", marginTop: 20}}>
            <Button variant={'contained'} size="large" onClick={()=>{router.push('/createcourse')}}>Create Course</Button>   
         </div>   
    </div>
}

function Course(props: courseSchemaWithID) {
    const router = useRouter();
    return (
    <Card variant={"outlined"} style = {{margin:10, minHeight:200, width: 300, padding: 20}}>
        <Typography textAlign={"center"} variant={'h5'}>{props.title}</Typography>
        <Typography textAlign={"center"} variant={'h6'}>{props.description}</Typography>
        <img src={props.imageLink} style={{width: 300, borderRadius: 20}} ></img>
        <div style={{display: "flex", justifyContent: "center", marginTop: 20}}>
            <Button variant={'contained'} size="large" onClick = {() => {
                router.push(`/courses/${props._id}`)}}>Edit Course</Button>
        </div>
    </Card>
    )
}

export default ShowCourses;