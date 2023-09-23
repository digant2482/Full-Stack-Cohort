import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Landing from './components/Landing';
import Login from './components/Login';
import Register from './components/Register';
import PurchasedCourses from './components/PurchasedCourses';
import ViewAllCourses from './components/ViewAllCourses';
import CourseDetails from './components/CourseDetails';
import './App.css'

function App() {

  return (
    <Router>
        <Routes>
            <Route path="/" element={<Landing />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/purchasedcourses" element={<PurchasedCourses />} />
            <Route path="/courses/" element={<ViewAllCourses />} />
            <Route path="/courses/:courseId" element={<CourseDetails />} />
        </Routes>
    </Router>
  );
}

export default App
