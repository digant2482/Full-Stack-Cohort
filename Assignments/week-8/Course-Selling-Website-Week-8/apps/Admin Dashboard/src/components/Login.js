"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ui_1 = require("ui");
var material_1 = require("@mui/material");
function UserLogin() {
    return (<div>
        <div style={{
            display: "flex",
            justifyContent: "center"
        }}>
            <material_1.Typography variant={"h6"} style={{ marginTop: 150, marginBottom: 10, justifyContent: "center" }}>   
                Welcome back, Login (Admin)
            </material_1.Typography>
        </div>
        <div style={{
            display: "flex",
            justifyContent: "center"
        }}>
            <ui_1.Login backendUrl={"http://localhost:3000/admin/login"}/>
        </div>
    </div>);
}
exports.default = UserLogin;
