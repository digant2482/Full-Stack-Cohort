import React from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import {Button, TextField, Card, Typography} from '@mui/material';

/// File is incomplete. You need to add input boxes to take input for users to login.
function Login() {
    const [email, setEmail] = React.useState("");
    const [password, setPassword] = React.useState("");
    const [errorMessage, setErrorMessage] = React.useState("");

    const sendLoginRequest = () => {
        axios.post("http://localhost:3000/users/login", null, { headers : {username : email, password}})
            .then((response) => {
            if (response.status === 200){
                localStorage.setItem("Auth-Key-User", response.data.token);
                window.location = "/courses";
            }})
            .catch((error) => {
                setErrorMessage(error.response.data.message);
            });
    }

    return <div>
    <div style={{
        display: "flex",
        justifyContent: "center"
    }}>
        <Typography variant = {"h6"} style = {{marginTop: 150, marginBottom: 10, justifyContent: "center"}}>   
            Welcome back, Login 
        </Typography>
    </div>
    <div style={{
        display: "flex",
        justifyContent: "center"
    }}>
    <Card variant={"outlined"} style = {{width: 400, padding: 20}}>
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
        <Button variant="contained" onClick = {sendLoginRequest}>Login</Button>
        {errorMessage && 
        <Typography variant = {"subtitle2"} style = {{marginTop: 10}}>   
            {errorMessage}
        </Typography>}
    </Card>
    </div>
</div>
}

export default Login;