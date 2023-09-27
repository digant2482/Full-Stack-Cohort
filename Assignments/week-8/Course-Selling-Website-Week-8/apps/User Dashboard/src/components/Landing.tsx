import {useNavigate} from 'react-router-dom';
import Button from '@mui/material/Button';

function Landing(){
    const navigate = useNavigate();

    return (
        <div>
            <div style={{
                marginTop: 150,
                marginBottom: 10,
                display: 'flex',
                justifyContent: 'center'
            }}>
                <h1>Welcome to Coursera</h1>
            </div>
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
            </div>
        </div>
    )
}

export default Landing;