import { Login } from "ui";
import { Typography } from "@mui/material"
import { userState } from "../store/atoms/user"
import { useSetRecoilState } from 'recoil';

export default function UserLogin() {
    const setUserState = useSetRecoilState(userState);

    return (
    <div>
        <div style={{
            display: "flex",
            justifyContent: "center"
        }}>
            <Typography variant = {"h4"} style = {{marginTop: 120, marginBottom: 10, justifyContent: "center"}}>   
                Welcome to Admin Login 
            </Typography>
        </div>
        <div style={{
            display: "flex",
            justifyContent: "center"
        }}>
            <Login backendUrl={"http://localhost:3000/admin/login"} setUserState={setUserState}/>
        </div>
</div>)
}