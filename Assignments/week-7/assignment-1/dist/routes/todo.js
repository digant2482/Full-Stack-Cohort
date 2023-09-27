"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const index_1 = require("../middleware/index");
const db_1 = require("../db");
const zod_1 = require("zod");
const titleSchema = zod_1.z.string();
const descriptionSchema = zod_1.z.string();
const userIdSchema = zod_1.z.string();
const doneSchema = zod_1.z.boolean({ required_error: "isActive is required", invalid_type_error: "isActive must be a boolean",
});
const router = express_1.default.Router();
router.post('/todos', index_1.authenticateJwt, (req, res) => {
    const titleCheck = titleSchema.safeParse(req.body.title);
    const descriptionCheck = descriptionSchema.safeParse(req.body.description);
    const doneCheck = doneSchema.safeParse(req.body.done);
    const userIdCheck = userIdSchema.safeParse(req.headers['userId']);
    if (!titleCheck.success) {
        res.status(422).json({ error: 'Invalid title' });
        return;
    }
    if (!descriptionCheck.success) {
        res.status(422).json({ error: 'Invalid Description' });
        return;
    }
    if (!doneCheck.success) {
        res.status(422).json({ error: 'Invalid published (done)' });
        return;
    }
    if (!userIdCheck.success) {
        res.status(422).json({ error: 'Invalid userId' });
        return;
    }
    const input = req.body;
    const done = false;
    const userId = req.headers['userId'];
    const newTodo = new db_1.Todo({ title: input.title, description: input.description, done, userId });
    newTodo.save()
        .then((savedTodo) => {
        res.status(201).json(savedTodo);
    })
        .catch((err) => {
        res.status(500).json({ error: 'Failed to create a new todo' });
    });
});
router.get('/todos', index_1.authenticateJwt, (req, res) => {
    const userId = req.headers['userId'];
    db_1.Todo.find({ userId })
        .then((todos) => {
        res.json(todos);
    })
        .catch((err) => {
        res.status(500).json({ error: 'Failed to retrieve todos' });
    });
});
router.patch('/todos/:todoId/done', index_1.authenticateJwt, (req, res) => {
    const { todoId } = req.params;
    const userId = req.headers['userId'];
    db_1.Todo.findOneAndUpdate({ _id: todoId, userId }, { done: true }, { new: true })
        .then((updatedTodo) => {
        if (!updatedTodo) {
            return res.status(404).json({ error: 'Todo not found' });
        }
        res.json(updatedTodo);
    })
        .catch((err) => {
        res.status(500).json({ error: 'Failed to update todo' });
    });
});
exports.default = router;
