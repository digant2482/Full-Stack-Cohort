import express from 'express';
import { authenticateJwt, SECRET } from "../middleware/index";
import { Todo } from "../db";
import { z } from 'zod';

const titleSchema = z.string();
const descriptionSchema = z.string();
const userIdSchema = z.string();
const doneSchema = z.boolean();

interface CreateTodoInput {
  title : string;
  description : string;
}

const router = express.Router();

router.post('/todos', authenticateJwt, (req, res) => {

  const titleCheck = titleSchema.safeParse(req.body.title);
  const descriptionCheck = descriptionSchema.safeParse(req.body.description);
  const doneCheck = doneSchema.safeParse(req.body.done);
  const userIdCheck = userIdSchema.safeParse(req.headers['userId']);
  if (!titleCheck.success){
    res.status(422).json({ error: 'Invalid title' });
    return;
  }
  if (!descriptionCheck.success){
    res.status(422).json({ error: 'Invalid Description' });
    return;
  }
  if (!doneCheck.success){
    res.status(422).json({ error: 'Invalid published (done)' });
    return;
  }
  if (!userIdCheck.success){
    res.status(422).json({ error: 'Invalid userId' });
    return;
  }
  const input : CreateTodoInput = req.body;
  const done = false;
  const userId = req.headers['userId'];


  const newTodo = new Todo({ title : input.title, description : input.description, done, userId });

  newTodo.save()
    .then((savedTodo) => {
      res.status(201).json(savedTodo);
    })
    .catch((err) => {
      res.status(500).json({ error: 'Failed to create a new todo' });
    });
});


router.get('/todos', authenticateJwt, (req, res) => {
  const userId = req.headers['userId'];

  Todo.find({ userId })
    .then((todos) => {
      res.json(todos);
    })
    .catch((err) => {
      res.status(500).json({ error: 'Failed to retrieve todos' });
    });
});

router.patch('/todos/:todoId/done', authenticateJwt, (req, res) => {
  const { todoId } = req.params;
  const userId = req.headers['userId'];

  Todo.findOneAndUpdate({ _id: todoId, userId }, { done: true }, { new: true })
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

export default router;