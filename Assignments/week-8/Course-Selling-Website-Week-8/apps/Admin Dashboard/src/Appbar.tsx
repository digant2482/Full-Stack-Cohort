import { Typography, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { isUserLoadingState } from "./store/selectors/isUserLoading";
import { userEmailState } from "./store/selectors/userEmail";
import { userState } from "./store/atoms/user"
import { useRecoilValue, useSetRecoilState } from 'recoil';

function Appbar(){
    const email = useRecoilValue(userEmailState);
    const isLoading = useRecoilValue(isUserLoadingState);
    const setUser = useSetRecoilState(userState);
    const navigate = useNavigate();

    const logout = () => {
        localStorage.setItem("Auth-Key", "");
        setUser({
            isLoading: false,
            userEmail: ""
        });
        navigate('/');
    }

    if (isLoading){
        return <div style={{backgroundColor: "#E7E8E8", display:"flex", padding: 4}}>
            <img style={{marginLeft:10, marginRight: 50}} height={50}src="data:image/png;base64,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" alt="" />
            <Typography style={{marginTop: 10, marginLeft: 500}} variant={"subtitle1"}>Loading...</Typography>
        </div>
    }

    if (email){
        return  <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            backgroundColor: '#E7E8E8',
            padding: 4
        }}>
            <img style={{marginLeft:10}} height={50}src="data:image/png;base64,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" alt="" />
            <div style={{display:'flex'}}>
                <Button variant={'text'} style={{marginRight:10}} size={"small"} onClick={()=>{navigate('/courses')}}>Explore</Button>
                <Button variant={'text'} style={{marginRight:10}} size={"small"} onClick={()=>{navigate('/courses/purchasedcourses')}}>Your Courses</Button>
                <Button variant={'contained'} size={"small"} onClick={logout}>LogOut</Button>
            </div>
        </div>
    }

    return <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        backgroundColor: '#E7E8E8',
        padding: 4
    }}>
        <img style={{marginLeft:10}} height={50}src="data:image/png;base64,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" alt="" />
        <div style={{marginTop:5, marginRight: 10}}>
            <Button variant={'contained'} onClick={()=>{navigate('/signup')}} style={{marginRight: 10}}>SignUp</Button>
            <Button variant={'contained'} onClick={()=>{navigate('/login')}}>SignIn</Button>
        </div>
    </div>
}

export default Appbar;