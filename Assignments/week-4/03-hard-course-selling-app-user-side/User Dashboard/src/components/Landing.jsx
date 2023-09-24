import React from 'react';
import {useNavigate} from 'react-router-dom';

function Landing(){
    const navigate = useNavigate();
    console.log("here");

    return (
        <div>
            <h1>Welcome to Course Selling Website</h1>
            <button variant="contained" onClick = {()=>{navigate('/register')}}>Register</button>
            <br/>
            <button variant="contained" onClick = {()=>{navigate('/login')}}>Login</button>
        </div>
    )
}

export default Landing;