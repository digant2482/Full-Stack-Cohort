import { Login } from "ui";
import { Typography } from "@mui/material"

export default function UserLogin() {
    return (
    <div>
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
            <Login backendUrl={"http://localhost:3000/users/login"}/>
        </div>
</div>)
}