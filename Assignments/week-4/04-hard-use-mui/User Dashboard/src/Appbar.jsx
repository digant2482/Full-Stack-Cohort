import { Typography, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import React from 'react';
import axios from 'axios';

function Appbar(){
    const [email, setEmail] = React.useState("");
    const [isLoading, setIsLoading] = React.useState(true);
    const navigate = useNavigate();
    const token = "Bearer " + localStorage.getItem("Auth-Key-User");

    React.useEffect(()=>{
        axios.get('http://localhost:3000/users/me', {headers: { token }})
        .then((response)=>{
            if (response.status === 200){
                setEmail(response.data.email);
            }
            setIsLoading(false);
        })
        .catch(error => setIsLoading(false));   
    },[])

    const logout = () => {
        localStorage.setItem("Auth-Key-User", null);
        window.location = '/';
    }

    if (isLoading){
        return <div>
            Loading...
        </div>
    }

    if (email){
        return  <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            padding: 4
        }}>
            <Typography variant={'h6'}>Coursera</Typography>
            <div style={{display:'flex'}}>
                <Typography variant={'subtitle1'} style={{marginRight: 10, marginTop: 5}}>Welcome {email}</Typography>
                <Button variant={'contained'} onClick={logout}>LogOut</Button>
            </div>
        </div>
    }

    return <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        padding: 4
    }}>
        <Typography variant={'h6'}>Coursera</Typography>
        <div>
            <Button variant={'contained'} onClick={()=>{navigate('/signup')}} style={{marginRight: 10}}>SignUp</Button>
            <Button variant={'contained'} onClick={()=>{navigate('/login')}}>SignIn</Button>
        </div>
    </div>
}

export default Appbar;