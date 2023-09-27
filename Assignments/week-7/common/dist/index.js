"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.todoBodyInput = exports.signupInput = void 0;
const zod_1 = require("zod");
exports.signupInput = zod_1.z.object({
    username: zod_1.z.string(),
    password: zod_1.z.string()
});
exports.todoBodyInput = zod_1.z.object({
    title: zod_1.z.string(),
    description: zod_1.z.string(),
    done: zod_1.z.boolean(),
    id: zod_1.z.string()
});
