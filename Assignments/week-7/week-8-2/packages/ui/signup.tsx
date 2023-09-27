import { Button, Card, TextField } from "@mui/material";

export function Signup(){
    return (
    <div style={{display: 'flex', justifyContent: "center", marginTop: 140}}>
        <Card style={{width: 400, padding: 20}}>
            <TextField variant={"outlined"} fullWidth={true} label={"Email"}/>
            <br /> <br />
            <TextField variant={"outlined"} fullWidth={true} label={"Password"}/>
            <br />  <br />
            <Button variant={'contained'}>SignUp</Button>
        </Card>
    </div>)
}