import { create } from "domain";
import { Request, Response } from "express";
import { prisma } from "../../data/postgres";
import { todo } from "../../../generated/prisma/index";
// const todos = [
//   { id: 1, title: "Todo 1", completedAt: new Date() },
//   { id: 2, title: "Todo 2", completedAt: null },
//   { id: 3, title: "Todo 3", completedAt: new Date() },
// ];

export class TodoController {
  //* DI
  constructor() {}

  public getTodos = async (req: Request, res: Response) => {
    const todos = await prisma.todo.findMany();
    return res.status(200).json(todos);
  };
  public getTodoById = async (req: Request, res: Response) => {
    const { id } = req.params;
    if (isNaN(Number(id)))
      return res.status(400).json({ error: "ID argument is not a number" });
    const todo = await prisma.todo.findUnique({
      where: { id: Number(id) },
    });
    todo
      ? res.status(200).json(todo)
      : res.status(404).json({ error: `Todo with id ${id} not found` });
  };
  public createTodo = async (req: Request, res: Response) => {
    const { title } = req.body;
    //Validate field title and description
    if (!title)
      return res
        .status(400)
        .json({ error: "Title and description are required" });
    const newTodo = await prisma.todo.create({ data: { title } });
    res.status(201).json(newTodo);
  };
  public updateTodo = async (req: Request, res: Response) => {
    const id = +req.params.id;
    if (isNaN(id))
      return res.status(400).json({ error: "ID argument is not a number" });
    const todo = await prisma.todo.findUnique({ where: { id: Number(id) } });
    if (!todo)
      return res.status(404).json({ error: `Todo with id ${id} not found` });

    const { title, completedAt } = req.body;
    const updatedTodo = await prisma.todo.update({
      where: {
        id: Number(id),
      },
      data: {
        title,
        completedAt: completedAt ? new Date(completedAt) : null,
      },
    });
    return res.status(200).json(todo);
  };
  public deleteTodo = async (req: Request, res: Response) => {
    const id = +req.params.id;
    if (isNaN(id))
      return res.status(400).json({ error: "ID argument is not a number" });
    const todo = await prisma.todo.findUnique({ where: { id: Number(id) } });
    if (!todo)
      return res.status(404).json({ error: `Todo with id ${id} not found` });
    const deletedTodo = await prisma.todo.delete({ where: { id: Number(id) } });
    if (!deletedTodo)
      return res.status(404).json({ error: `Todo with id ${id} not found` });
    return res.status(200).json({ message: "Todo deleted successfully" });
  };
}
