"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_router_dom_1 = require("react-router-dom");
var Button_1 = __importDefault(require("@mui/material/Button"));
function Landing() {
    var navigate = (0, react_router_dom_1.useNavigate)();
    return (<div>
            <div style={{
            marginTop: 150,
            marginBottom: 10,
            display: 'flex',
            justifyContent: 'center'
        }}>
                <h1>Welcome to Coursera</h1>
            </div>
            <div style={{
            display: 'flex',
            justifyContent: 'center',
        }}>
                <Button_1.default variant="contained" style={{
            marginRight: 10
        }} onClick={function () { navigate('/signup'); }}>SignUp</Button_1.default>
                <Button_1.default variant="contained" onClick={function () { navigate('/login'); }}>Login</Button_1.default>
            </div>
        </div>);
}
exports.default = Landing;
