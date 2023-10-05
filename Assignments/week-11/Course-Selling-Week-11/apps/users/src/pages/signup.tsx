import { Signup } from "ui";
import { Grid } from "@mui/material";

function Register() {
    return (
    <div>
        <Grid container>
            <Grid item lg={6} md={6} sm={12}>
                <div style={{
                    width:400,
                    display: "flex",
                    justifyContent: "center",
                    marginLeft: 90, 
                    position: "relative",
                    zIndex:1
                }}>
                    <h1 style = {{marginTop: 120, marginBottom: 10}}>   
                        Create Account 
                    </h1>
                </div>
                <div style={{
                    display: "flex",
                    justifyContent: "left",
                    marginLeft: 100
                }}>
                    <Signup backendUrl={"http://localhost:3000/api/auth/signup"}/>
                </div>
            </Grid>
            <Grid item lg={6} md={6} sm={12}>
                <div style={{zIndex:0, marginTop: 110, marginRight:40, display:"flex", justifyContent:"right"}}>
                    <img src="https://img.freepik.com/premium-photo/group-students-with-laptop-book-doing-lessons_488220-6788.jpg?w=2000" alt="Teaching" width="500" height="300"/>            
                </div>  
            </Grid>
        </Grid>   
    </div>)
}

export default Register;