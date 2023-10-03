import {Signup} from "ui";
import axios from "axios";

export default function SignupPage(){

    return <div>
        <Signup onClick={async (username, password)=>{
            const response = await axios.post('/api/signup');
            localStorage.setItem("User-Key", response.data.token);

            //request to backend using usernam  e and password
        }}/>
    </div>
}