import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Landing from './components/Landing';
import UserLogin from './components/Login';
import Register from './components/Register';
import PurchasedCourses from './components/PurchasedCourses';
import ViewAllCourses from './components/ViewAllCourses';
import CourseDetails from './components/CourseDetails';
import Appbar from './Appbar';
import './App.css'

function App() {

  return (
    <div style={{
      width: "100vw",
      height: "100vh",
      backgroundColor: "#eeeeee"
    }}>
      <Router>
        <Appbar/>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/login" element={<UserLogin />} />
          <Route path="/signup" element={<Register />} />
          <Route path="/purchasedcourses" element={<PurchasedCourses />} />
          <Route path="/courses/" element={<ViewAllCourses />} />
          <Route path="/courses/:courseId" element={<CourseDetails />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App