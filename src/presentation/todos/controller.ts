import { Request, Response } from "express";
import { CreateTodoDto, UpdateTodoDto } from "../../domain/dtos";
import {
  CreateTodo,
  DeleteTodo,
  GetTodoById,
  GetTodos,
  TodoRepository,
  UpdateTodo,
} from "../../domain";
// const todos = [
//   { id: 1, title: "Todo 1", completedAt: new Date() },
//   { id: 2, title: "Todo 2", completedAt: null },
//   { id: 3, title: "Todo 3", completedAt: new Date() },
// ];

export class TodoController {
  //* DI
  constructor(private readonly todoRepository: TodoRepository) {}

  public getTodos = (req: Request, res: Response) => {
    new GetTodos(this.todoRepository)
      .execute()
      .then((todos) => res.status(200).json(todos))
      .catch((error) => res.status(400).json({ error }));
  };
  public getTodoById = (req: Request, res: Response) => {
    const id = +req.params.id;
    new GetTodoById(this.todoRepository)
      .execute(id)
      .then((todo) => res.status(200).json(todo))
      .catch((error) => res.status(400).json({ error }));
  };
  public createTodo = (req: Request, res: Response) => {
    const [error, createTodoDto] = CreateTodoDto.create(req.body);
    if (error) return res.status(400).json({ error });
    new CreateTodo(this.todoRepository)
      .execute(createTodoDto!)
      .then((todo) => res.status(201).json(todo))
      .catch((error) => res.status(400).json({ error }));
  };
  public updateTodo = async (req: Request, res: Response) => {
    const id = +req.params.id;
    const [error, updateTodoDto] = UpdateTodoDto.create({ ...req.body, id });
    if (error) return res.status(400).json({ error });

    new UpdateTodo(this.todoRepository)
      .execute(updateTodoDto!)
      .then((todo) => res.status(200).json(todo))
      .catch((error) => res.status(400).json({ error }));
  };
  public deleteTodo = async (req: Request, res: Response) => {
    const id = +req.params.id;
    if (isNaN(id))
      return res.status(400).json({ error: "ID argument is not a number" });
    new DeleteTodo(this.todoRepository)
      .execute(id)
      .then((todo) => res.status(200).json(todo))
      .catch((error) => res.status(400).json({ error }));
  };
}
