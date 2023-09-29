import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Landing from './components/Landing';
import UserLogin from './components/Login';
import Register from './components/Register';
import PurchasedCourses from './components/PurchasedCourses';
import ViewAllCourses from './components/ViewAllCourses';
import CourseDetails from './components/CourseDetails';
import Appbar from './Appbar';
import './App.css'
import { RecoilRoot, useSetRecoilState } from 'recoil';
import { userState } from "./store/atoms/user";
import axios from 'axios';
import { useEffect } from 'react';

function App() {
  return (
    <div style={{
      width: "100vw",
      height: "100vh",
      backgroundColor: "#eeeeee"
    }}>
    <RecoilRoot>
      <Router>
        <Appbar/>
        <InitUser/>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/login" element={<UserLogin />} />
          <Route path="/signup" element={<Register />} />
          <Route path="/purchasedcourses" element={<PurchasedCourses />} />
          <Route path="/courses/" element={<ViewAllCourses />} />
          <Route path="/courses/:courseId" element={<CourseDetails />} />
        </Routes>
      </Router>
      </RecoilRoot>
    </div>
  );
}

function InitUser(){
  const setUser = useSetRecoilState(userState);
  const init = async ()=>{
    try{
      const token = "Bearer " + localStorage.getItem("Auth-Key-User");
      const response = await axios.get('http://localhost:3000/users/me', {headers: { token }});

      console.log(response.data);
      if (response.data.username){
        setUser({
          isLoading: false,
          userEmail: response.data.username
        });
      } else {
        setUser({
          isLoading: false,
          userEmail: ""
        });
      }  
    }
    catch {
      setUser({
        isLoading: false,
        userEmail: ""
      });
    }
  }  
  useEffect(()=>{
    init();
  },[])
  return <></>
}

export default App