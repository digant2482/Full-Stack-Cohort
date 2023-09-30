import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Landing from './components/Landing';
import AdminLogin from './components/Login';
import Register from './components/Register';
import CreateCourse from './components/CreateCourse';
import ViewAllCourses from './components/ViewAllCourses';
import UpdateCourse from './components/UpdateCourse';
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
          <Route path="/login" element={<AdminLogin />} />
          <Route path="/signup" element={<Register />} />
          <Route path="/createcourse" element={<CreateCourse />} />
          <Route path="/courses/" element={<ViewAllCourses />} />
          <Route path="/courses/:courseId" element={<UpdateCourse />} />
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
      const token = "Bearer " + localStorage.getItem("Auth-Key");
      const response = await axios.get('http://localhost:3000/admin/me', {headers: { token }});

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