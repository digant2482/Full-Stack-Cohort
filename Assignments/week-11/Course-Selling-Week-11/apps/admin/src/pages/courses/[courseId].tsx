import React from "react";
import axios from "axios";
import { Card, Typography, Button, TextField, Grid } from "@mui/material";
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { courseTitleState } from 'store';
import { coursePriceState } from 'store';
import { courseImageLinkState } from 'store';
import { useRouter } from "next/router";

function UpdateCourse () {
    const router = useRouter();
    if (typeof router.query.courseId === "string"){
        var courseId = router.query.courseId;
    } else {
        return;
    }

    return  (
        <div> 
            <GrayTopper/>
                <Grid container>
                <Grid item lg={8} md={12} sm={12}>
                    <UpdateCard courseId={courseId || ""}/>
                </Grid>
                <Grid item lg={8} md={12} sm={12}>
                    <CourseCard />
                </Grid>            
            </Grid>   
        </div>
    )
}

type updateCardPropsType = {
    courseId: string,
}

function UpdateCard(props: updateCardPropsType){
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
    const router = useRouter();
    
    React.useEffect(()=>{
        axios.get('http://localhost:3000/api/courses/fetch/' + props.courseId, {headers: { token }})
        .then((response)=>{
            if (response.status === 200){
                setTitle(response.data.title);
                setDescription(response.data.description);
                setPrice(response.data.price);
                setImageLink(response.data.imageLink);
                setPublished(response.data.published);
            }
        });
    },[]);

    const updateCourse = async () => {
        const body = {
            title,
            description,
            price,
            imageLink,
            published
        }

        const response = await axios.put("http://localhost:3000/api/courses/edit/" + props.courseId, body, {headers : { token }});
        if (response.status === 200) {
            router.push('/courses');
        } else {
            setErrorText('Unauthorised access');
        }
    }
    
    return (
    <div style={{display: "flex", justifyContent: "center"}}>
        <Card variant={"outlined"} style={{maxWidth: 550, marginTop: 200}}>
            <div style={{padding: 20}}>
            <Typography style={{marginBottom: 10}}>Update course details</Typography>
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
            value={published} 
            label={"Published"} 
            fullWidth={true}
            onChange={(e)=>{setPublished(e.target.value ? true : false)}}
            />

            <Button 
                variant={"contained"} 
                onClick={updateCourse}
                style={{marginBottom: 10}} 
            >Update Course</Button>
            
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

export default UpdateCourse