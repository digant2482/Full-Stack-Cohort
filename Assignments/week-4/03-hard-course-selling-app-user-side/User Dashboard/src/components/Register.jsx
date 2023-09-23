import React from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

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
                setErrorMessage(error.response.data.message);
            });          
    }

    return <div>
        <h1>Register to the website</h1>
        <br/>
        Enter username
        <input type={"text"} onChange={e => setEmail(e.target.value)} />
        <br/>
        Enter password
        <input type={"text"} onChange={e => setPassword(e.target.value)} />
        <br/>
        <button onClick = {signupRequest}>Sign Up</button>
        <br/>
        Already a user? <button onClick = {()=>{navigate('/login')}}>Login</button>
        <br/>
        {errorMessage && <p> {errorMessage}</p>}
        <br/>
    </div>
}

export default Register;