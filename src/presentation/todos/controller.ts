import { Request, Response } from "express";
const todos = [
  { id: 1, title: "Todo 1", description: "Description 1", completed: true },
  { id: 2, title: "Todo 2", description: "Description 2", completed: false },
  { id: 3, title: "Todo 3", description: "Description 3", completed: true },
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
}
