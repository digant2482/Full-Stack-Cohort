import React from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

/// File is incomplete. You need to add input boxes to take input for users to login.
function Login() {
    const [email, setEmail] = React.useState("");
    const [password, setPassword] = React.useState("");
    const [errorMessage, setErrorMessage] = React.useState("");
    const navigate = useNavigate();

    console.log(errorMessage);
    const sendLoginRequest = () => {
        axios.post("http://localhost:3000/users/login", null, { headers : {username : email, password}})
            .then((response) => {
            if (response.status === 200){
                localStorage.setItem("Auth-Key-User", response.data.token);
                navigate("/courses");
            }})
            .catch((error) => {
                setErrorMessage(error.response.data.message);
            });
    }

    return <div>
        <h1>Login user dashboard</h1>
        <br/>
        Email - <input type={"text"} onChange={e => setEmail(e.target.value)} />
        <br/>
        Password - <input type={"text"} onChange={e => setPassword(e.target.value)} />
        <br/>
        <button onClick={sendLoginRequest}>Login</button>
        <br/>
        New here? <button onClick = {()=>{navigate('/register')}}>Register</button>
        <br/>
        {errorMessage && <p>{errorMessage}</p>}
    </div>
}

export default Login;