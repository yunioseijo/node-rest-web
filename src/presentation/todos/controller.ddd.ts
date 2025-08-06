import { create } from "domain";
import { Request, Response } from "express";
import { prisma } from "../../data/postgres";
import { todo } from "../../../generated/prisma/index";
import { CreateTodoDto, UpdateTodoDto } from "../../domain/dtos";
import { TodoRepository } from "../../domain";
// const todos = [
//   { id: 1, title: "Todo 1", completedAt: new Date() },
//   { id: 2, title: "Todo 2", completedAt: null },
//   { id: 3, title: "Todo 3", completedAt: new Date() },
// ];

export class TodoController {
  //* DI
  constructor(private readonly todoRepository: TodoRepository) {}

  public getTodos = async (req: Request, res: Response) => {
    const todos = await this.todoRepository.getAll();
    return res.status(200).json(todos);
  };
  public getTodoById = async (req: Request, res: Response) => {
    const { id } = req.params;
    if (isNaN(Number(id)))
      return res.status(400).json({ error: "ID argument is not a number" });
    try {
      const todo = await this.todoRepository.findById(Number(id));
      return res.status(200).json(todo);
    } catch (error) {
      res.status(400).json({ error: `Todo with id ${id} not found` });
    }
  };
  public createTodo = async (req: Request, res: Response) => {
    const [error, createTodoDto] = CreateTodoDto.create(req.body);
    if (error) return res.status(400).json({ error });

    const newTodo = await this.todoRepository.create(createTodoDto!);
    res.status(201).json(newTodo);
  };
  public updateTodo = async (req: Request, res: Response) => {
    const id = +req.params.id;
    const [error, updateTodoDto] = UpdateTodoDto.create({ ...req.body, id });
    if (error) return res.status(400).json({ error });

    const updatedTodo = await this.todoRepository.updateById(updateTodoDto!);
    return res.status(200).json(updatedTodo);
  };
  public deleteTodo = async (req: Request, res: Response) => {
    const id = +req.params.id;
    if (isNaN(id))
      return res.status(400).json({ error: "ID argument is not a number" });
    try {
      const todo = await this.todoRepository.deleteById(id);
      return res.status(200).json({ message: "Todo deleted successfully" });
    } catch (error) {
      return res.status(404).json({ error: `Todo with id ${id} not found!!` });
    }
  };
}
