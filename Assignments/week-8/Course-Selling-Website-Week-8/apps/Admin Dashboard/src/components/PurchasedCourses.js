"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = __importDefault(require("react"));
var axios_1 = __importDefault(require("axios"));
var material_1 = require("@mui/material");
var react_router_dom_1 = require("react-router-dom");
function ShowCourses() {
    var _a = react_1.default.useState([]), courses = _a[0], setCourses = _a[1];
    var authKey = localStorage.getItem("Auth-Key-User");
    var token = "Bearer " + authKey;
    var navigate = (0, react_router_dom_1.useNavigate)();
    react_1.default.useEffect(function () {
        axios_1.default.get("http://localhost:3000/users/purchasedCourses", { headers: { token: token } }).then(function (response) {
            console.log(response.data);
            if (response.status === 200)
                setCourses(response.data);
            else
                navigate("/login");
        });
    }, []);
    return <div>
        <material_1.Typography variant={"h4"} style={{ display: 'flex', justifyContent: 'center' }}>Your Courses</material_1.Typography>
        <br />
            {courses.map(function (c) { return <Course title={c.title} description={c.description} price={c.price} id={c.id}/>; })}
    </div>;
}
function Course(props) {
    return <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 10 }}>
    <material_1.Card variant={"outlined"} style={{ width: 300, padding: 20 }}>
    <material_1.Typography>Title: {props.title}</material_1.Typography>
    <material_1.Typography>Description: {props.description}</material_1.Typography>   
    </material_1.Card>
    </div>;
}
exports.default = ShowCourses;
