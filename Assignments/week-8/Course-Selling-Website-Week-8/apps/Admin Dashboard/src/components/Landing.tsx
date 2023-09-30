import { useNavigate } from 'react-router-dom';
import { Button, Grid } from '@mui/material';
import { useRecoilValue } from 'recoil';
import { userEmailState } from '../store/selectors/userEmail';
import { isUserLoadingState } from '../store/selectors/isUserLoading';


function Landing(){
    return (
    <div>
        <Grid container style={{padding: "5vw"}}>
            <Grid item lg={6} md={6} xs={12}>
                <div style={{marginTop: 160, paddingLeft: 20,zIndex:1, position: "relative"}}>
                    <div style={{
                        marginBottom: 10,
                        display: 'flex',
                        justifyContent: 'center',
                        zIndex:1
                    }}>
                        <h1>Welcome to Coursera</h1>
                    </div>
                        <Buttons/>
                    </div>
            </Grid>
            <Grid item lg={6} md={6} sm={12}>
                <div style={{marginTop: 50, marginRight:30, zIndex:0, display: "flex", justifyContent: "right"}}>
                    <img height={400} src="https://graduate.northeastern.edu/resources/wp-content/uploads/sites/4/2019/09/iStock-1150384596-2.jpg" alt="" />
                </div>
            </Grid>
        </Grid> 
    </div>
    )
}

function Buttons(){
    const userEmail = useRecoilValue(userEmailState);
    const userLoading = useRecoilValue(isUserLoadingState);
    const navigate = useNavigate();

    if (userLoading){
        return <></>
    }

    return <div>
     {!userEmail && (
        <div style = {{
            display: 'flex',
            justifyContent: 'center',
        }}>
            <Button
            variant="contained"
            style={{
                marginRight: 10
            }}
            onClick = {()=>{navigate('/signup')}}>SignUp</Button>
            <Button variant="contained" onClick = {()=>{navigate('/login')}}>Login</Button>
        </div>)
    }
    </div>
}

export default Landing;