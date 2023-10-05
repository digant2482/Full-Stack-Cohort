import React from "react";
import axios from "axios";
import { useRouter } from "next/router";
import {Button, TextField, Card, Typography} from '@mui/material';

type propType = {backendUrl:string};

export function Signup(prop: propType) {
    const [email, setEmail] = React.useState("");
    const [password, setPassword] = React.useState("");
    const [errorMessage, setErrorMessage] = React.useState(""); // State for error message
    const router = useRouter();

    const signupRequest = () => {
        let body = { username : email, password };
        axios.post(prop.backendUrl, null, {headers: body}).then((response) => {
            if (response.status === 200) 
                router.push("/Login");
            })
            .catch((error) => {
                setErrorMessage(error.response.data.message);
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