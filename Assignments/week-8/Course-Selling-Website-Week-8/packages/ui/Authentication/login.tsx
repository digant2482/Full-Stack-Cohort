import React from "react";
import axios from "axios";
import {Button, TextField, Card, Typography} from '@mui/material';
import { useNavigate } from "react-router-dom";
import { SetterOrUpdater } from "recoil"

type userState = {
    isLoading: boolean,
    userEmail: string
}
type propType = {backendUrl: string, setUserState: SetterOrUpdater<userState>};
export function Login(prop: propType) {
    const [email, setEmail] = React.useState("");
    const [password, setPassword] = React.useState("");
    const [errorMessage, setErrorMessage] = React.useState("");
    const navigate = useNavigate();

    const sendLoginRequest = () => {
        axios.post(prop.backendUrl, null, { headers : {username : email, password}})
            .then((response) => {
            if (response.status === 200){
                if (prop.backendUrl.includes("user")){
                    localStorage.setItem("Auth-Key-User", response.data.token);
                } else {
                    localStorage.setItem("Auth-Key", response.data.token);
                }
                prop.setUserState({
                    isLoading: false,
                    userEmail: email
                })
                navigate('/courses');
            }})
            .catch((error) => {
                setErrorMessage(error.response.data.message);
            });
    }

    return <Card variant={"outlined"} style = {{width: 400, padding: 20}}>
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
}