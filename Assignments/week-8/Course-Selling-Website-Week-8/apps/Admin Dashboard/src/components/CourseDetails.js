"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = __importDefault(require("react"));
var axios_1 = __importDefault(require("axios"));
var react_router_dom_1 = require("react-router-dom");
var material_1 = require("@mui/material");
function CourseDetails() {
    var courseId = (0, react_router_dom_1.useParams)().courseId;
    var _a = react_1.default.useState(), course = _a[0], setCourse = _a[1];
    var authKey = localStorage.getItem("Auth-Key-User");
    var token = "Bearer " + authKey;
    var navigate = (0, react_router_dom_1.useNavigate)();
    react_1.default.useEffect(function () {
        axios_1.default.get("http://localhost:3000/users/courses/" + courseId, { headers: { token: token } }).then(function (response) {
            if (response.status === 200) {
                setCourse(response.data);
            }
        });
    }, []);
    var purchaseCourse = function () {
        axios_1.default.post("http://localhost:3000/users/courses/" + courseId, null, { headers: { token: token } }).then(function (response) {
            if (response.status === 200) {
                navigate("/courses");
            }
        });
    };
    return <div>
        {course &&
            <material_1.Card>
            <material_1.Typography>{course.title}</material_1.Typography>
            <material_1.Typography>{course.description}</material_1.Typography>
            <material_1.Typography>{course.price}</material_1.Typography>
            <button onClick={purchaseCourse}>Purchase course</button>
            <br />
        </material_1.Card>}
    </div>;
}
exports.default = CourseDetails;
