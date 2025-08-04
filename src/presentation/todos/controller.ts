import { Request, Response } from "express";

export class TodoController {
  //* DI
  constructor() {}

  public getTodos = (req: Request, res: Response) => {
    return res.json([
      { id: 1, title: "Todo 1", description: "Description 1", completed: true },
      {
        id: 2,
        title: "Todo 2",
        description: "Description 2",
        completed: false,
      },
      { id: 3, title: "Todo 3", description: "Description 3", completed: true },
    ]);
  };
}
