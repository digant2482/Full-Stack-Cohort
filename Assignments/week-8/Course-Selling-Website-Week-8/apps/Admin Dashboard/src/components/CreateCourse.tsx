import React from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Card, Typography, Button, TextField, Grid } from "@mui/material";
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { courseTitleState } from '../store/atoms/courseDetails/courseTitle'
import { coursePriceState } from '../store/atoms/courseDetails/coursePrice'
import { courseImageLinkState } from '../store/atoms/courseDetails/courseImageLink'

function CreateCourse () {
    return  (
        <div> 
            <GrayTopper/>
                <Grid container>
                <Grid item lg={8} md={12} sm={12}>
                    <UpdateCard />
                </Grid>
                <Grid item lg={8} md={12} sm={12}>
                    <CourseCard />
                </Grid>            
            </Grid>   
        </div>
    )
}

function UpdateCard(){
    const title = useRecoilValue(courseTitleState);
    const price = useRecoilValue(coursePriceState);
    const imageLink = useRecoilValue(courseImageLinkState);
    const setTitle = useSetRecoilState(courseTitleState);
    const setPrice = useSetRecoilState(coursePriceState);
    const setImageLink = useSetRecoilState(courseImageLinkState);
    const [description, setDescription] = React.useState('');
    const [published, setPublished] = React.useState(false);
    const [errorText, setErrorText] = React.useState("");

    const authKey = localStorage.getItem("Auth-Key");
    const token = "Bearer " + authKey;
    const navigate = useNavigate();

    React.useEffect(()=>{
        setTitle("");
        setPrice("");
        setImageLink("https://blog.coursify.me/wp-content/uploads/2018/08/plan-your-online-course.jpg");
    },[])
    
    const createCourse = async () => {
        const body = {
            title,
            description,
            price,
            imageLink,
            published
        }

        const response = await axios.post("http://localhost:3000/admin/courses/", body, {headers : { token }});
        if (response.status === 200) {
            navigate('/courses');
        } else {
            setErrorText('Unauthorised access');
        }
    }
    
    return (
    <div style={{display: "flex", justifyContent: "center"}}>
        <Card variant={"outlined"} style={{maxWidth: 550, marginTop: 200}}>
            <div style={{padding: 20}}>
            <Typography style={{marginBottom: 14}}>Create new course</Typography>
            <TextField
                variant={"outlined"}
                style={{marginBottom: 10}}
                value={title} 
                label={"Title"} 
                fullWidth={true}
                onChange={(e)=>{setTitle(e.target.value)}}
            />
        
            <TextField 
                variant={"outlined"} 
                style={{marginBottom: 10}}
                value={description} 
                label={"Description"} 
                fullWidth={true}
                onChange={(e)=>{setDescription(e.target.value)}}
            />
            
            <TextField 
                variant={"outlined"}
                style={{marginBottom: 10}} 
                value={price} 
                label={"Price"} 
                fullWidth={true}
                onChange={(e)=>{setPrice(e.target.value)}}
            />
           
            <TextField 
                variant={"outlined"} 
                style={{marginBottom: 10}} 
                value={imageLink} 
                label={"ImageLink"} 
                fullWidth={true}
                onChange={(e)=>{setImageLink(e.target.value)}}
            />

            <TextField 
            variant={"outlined"}
            style={{marginBottom: 10}} 
            label={"Published"} 
            fullWidth={true}
            onChange={(e)=>{setPublished(e.target.value === 'true' ? true : false)}}
            />

            <Button 
                variant={"contained"} 
                onClick={createCourse}
                style={{marginBottom: 10}} 
            >Create Course</Button>
            
            {errorText && <Typography>{errorText}</Typography>}
            </div>
        </Card>
    </div>
    )
}

function CourseCard(){
    const title = useRecoilValue(courseTitleState);
    const imageLink = useRecoilValue(courseImageLinkState);
    return ( <div style={{display: "flex",  marginTop: 50, justifyContent: "center", width: "100%"}}>
        <Card style={{
            margin: 10,
            width:350,
            minHeight: 200,
            borderRadius: 20,
            marginRight: 50,
            paddingBottom: 15,
            zIndex: 2
        }}>
            <img src={imageLink} style={{width:350}} alt="Course Image" />
            <div style={{marginLeft: 10}}>
                <Typography variant={'h6'}>{title}</Typography>
                <Price/>
            </div>
        </Card>
    </div>
    )
}

function Price() {
    const price = useRecoilValue(coursePriceState);
    return <>
        <Typography variant="subtitle2" style={{color: "gray"}}>
            Price
        </Typography>
        <Typography variant="subtitle1">
            <b>Rs {price} </b>
        </Typography>
    </>
}

function GrayTopper(){
    const title = useRecoilValue(courseTitleState);
    return (
        <div style={{height: 250, background: "#212121", top: 0, width: "100vw", zIndex: 0, marginBottom: -250}}>
            <div style={{ height: 250, display: "flex", justifyContent: "center", flexDirection: "column"}}>
                <div>
                    <Typography variant={"h3"} textAlign={"center"} style={{color: "white", fontWeight: 600}}>{title}</Typography>
                </div>
            </div>
        </div>
    )
}

export default CreateCourse