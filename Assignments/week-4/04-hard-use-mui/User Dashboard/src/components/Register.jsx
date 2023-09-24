import React from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import {Button, TextField, Card, Typography} from '@mui/material';

function Register() {
    const [email, setEmail] = React.useState("");
    const [password, setPassword] = React.useState("");
    const [errorMessage, setErrorMessage] = React.useState(""); // State for error message
    const navigate = useNavigate();

    const signupRequest = () => {
        let body = { username : email, password };
        axios.post("http://localhost:3000/users/signup", body).then((response) => {
            if (response.status === 200) 
                navigate("/Login");
            })
            .catch((error) => {
                console
                setErrorMessage(error.response.data.message);
                console.log(errorMessage)
            });          
    }

    return <div>
        <div style={{
            display: "flex",
            justifyContent: "center"
        }}>
            <Typography variant = {"h6"} style = {{marginTop: 150, marginBottom: 10, justifyContent: "center"}}>   
                Welcome to Coursera, Signup
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
            <Button variant="contained" onClick = {signupRequest}>SignUp</Button>
            {errorMessage && 
            <Typography variant = {"subtitle2"} style = {{marginTop: 10}}>   
                {errorMessage}
            </Typography>}
        </Card>
        </div>
    </div>
}

export default Register;