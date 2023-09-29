"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = __importDefault(require("react"));
var axios_1 = __importDefault(require("axios"));
var react_router_dom_1 = require("react-router-dom");
var material_1 = require("@mui/material");
function ShowCourses() {
    var _a = react_1.default.useState([]), courses = _a[0], setCourses = _a[1];
    var authKey = localStorage.getItem("Auth-Key-User");
    var token = "Bearer " + authKey;
    var navigate = (0, react_router_dom_1.useNavigate)();
    react_1.default.useEffect(function () {
        axios_1.default.get("http://localhost:3000/users/courses", { headers: { token: token } }).then(function (response) {
            console.log(response.data);
            if (response.status === 200)
                setCourses(response.data);
            else
                navigate("/login");
        });
    }, []);
    return <div>
        <material_1.Typography variant="h4" style={{ display: "flex", justifyContent: "center", marginTop: 20 }}>Courses</material_1.Typography>
        <br />
        <div style={{
            display: 'flex',
            justifyContent: 'center',
        }}>
            {courses.map(function (c) { return <Course title={c.title} description={c.description} price={c.price} key={c.id} id={c.id} navigate={navigate}/>; })}  
         </div>
         <div style={{ display: "flex", justifyContent: "center", marginTop: 20 }}>
            <material_1.Button variant={'contained'} onClick={function () { navigate('/purchasedcourses'); }}>View my purchases</material_1.Button>   
         </div>   
    </div>;
}
function Course(props) {
    return <material_1.Card variant={"outlined"} style={{ width: 300, padding: 20 }}>
        <material_1.Typography>Title: {props.title}</material_1.Typography>
        <br />  
        <material_1.Typography>Description: {props.description}</material_1.Typography>
        <br />
        <material_1.Typography>Price: {props.price.toString()}</material_1.Typography>
        <br />
        <material_1.Button variant={'contained'} onClick={function () { props.navigate("/courses/".concat(props.id)); }}>Purchase Course</material_1.Button>
        <br />
    </material_1.Card>;
}
exports.default = ShowCourses;
