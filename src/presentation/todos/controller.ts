import { create } from "domain";
import { Request, Response } from "express";
const todos = [
  { id: 1, title: "Todo 1", completedAt: new Date() },
  { id: 2, title: "Todo 2", completedAt: null },
  { id: 3, title: "Todo 3", completedAt: new Date() },
];

export class TodoController {
  //* DI
  constructor() {}

  public getTodos = (req: Request, res: Response) => {
    return res.json(todos);
  };
  public getTodoById = (req: Request, res: Response) => {
    const { id } = req.params;
    if (isNaN(Number(id)))
      return res.status(400).json({ error: "ID argument is not a number" });
    const todo = todos.find((todo) => todo.id === Number(id));
    todo
      ? res.json(todo)
      : res.status(404).json({ error: `Todo with id ${id} not found` });
  };
  public createTodo = (req: Request, res: Response) => {
    const { title } = req.body;
    //Validate field title and description
    if (!title)
      return res
        .status(400)
        .json({ error: "Title and description are required" });
    const newTodo = {
      id: todos.length + 1,
      title,
      completedAt: null,
    };
    todos.push(newTodo);
    res.status(201).json(newTodo);
  };
  public updateTodo = (req: Request, res: Response) => {
    const id = +req.params.id;
    if (isNaN(id))
      return res.status(400).json({ error: "ID argument is not a number" });
    //Find todo
    const todo = todos.find((todo) => todo.id === Number(id));
    if (!todo)
      return res.status(404).json({ error: `Todo with id ${id} not found` });

    const { title, completedAt } = req.body;

    //! OJO, Reference
    todo.title = title ? title : todo.title;
    todo.completedAt === null
      ? (todo.completedAt = null)
      : (todo.completedAt = new Date(completedAt || todo.completedAt));
    //Return updated todo
    return res.json(todo);
  };
}
