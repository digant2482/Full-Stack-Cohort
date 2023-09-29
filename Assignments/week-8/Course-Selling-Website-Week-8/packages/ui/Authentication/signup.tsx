import React from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import {Button, TextField, Card, Typography} from '@mui/material';

type propType = {backendUrl:string};

export function Signup(prop: propType) {
    const [email, setEmail] = React.useState("");
    const [password, setPassword] = React.useState("");
    const [errorMessage, setErrorMessage] = React.useState(""); // State for error message
    const navigate = useNavigate();

    const signupRequest = () => {
        let body = { username : email, password };
        axios.post(prop.backendUrl, body).then((response) => {
            if (response.status === 200) 
                navigate("/Login");
            })
            .catch((error) => {
                setErrorMessage(error.response.data.message);
                console.log(errorMessage)
            });          
    }

    return (    
        <Card variant={"outlined"} style = {{width: 350, padding: 20}}>
            <TextField
                fullWidth={true}
                id="outlined-basic" 
                label="Email" 
                variant="outlined"
                onChange={e => setEmail(e.target.value)} 
                style={{
                    marginBottom: 10
                }}
            />
            <br/>
            <TextField
                fullWidth={true}
                id="outlined-basic" 
                label="Password" 
                variant="outlined"
                onChange={e => setPassword(e.target.value)}
                style={{
                    marginBottom: 10
                }}
             />
            <Button variant="contained" onClick = {signupRequest}>SignUp</Button>
            {errorMessage && 
            <Typography variant = {"subtitle2"} style = {{marginTop: 10}}>   
                {errorMessage}
            </Typography>}
        </Card>
    )
}