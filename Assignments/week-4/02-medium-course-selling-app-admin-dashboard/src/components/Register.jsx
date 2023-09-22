import React from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

/// File is incomplete. You need to add input boxes to take input for users to register.
function Register() {
    const [email, setEmail] = React.useState("");
    const [password, setPassword] = React.useState("");
    const [errorMessage, setErrorMessage] = React.useState(""); // State for error message
    const navigate = useNavigate();

    const signupRequest = () => {
        let body = { username : email, password };
        axios.post("http://localhost:3000/admin/signup", body).then((response) => {
            if (response.status === 200) {
                navigate("/Login");
            }
            else {
                setErrorMessage("Username already taken. Please use another username");
            }
        }
    )
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
        {errorMessage && <p> Username taken, please try another username</p>}
        <br/>
        Already a user? <a href="/login">Login</a>
    </div>
}

export default Register;