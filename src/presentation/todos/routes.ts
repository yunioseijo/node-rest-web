import { Router } from "express";
import { TodoController } from "./controller";
import { TodoDataSourceImpl } from "../../infrastructure/datasource/todo.datasource.impl";
import { TodoRepositoryImpl } from "../../infrastructure/reapositories/todo.repository.impl";
import { todo } from "node:test";

export class TodoRoutes {
  static get routes(): Router {
    const router = Router();
    //*DI
    const datasource = new TodoDataSourceImpl();
    const todoRepository = new TodoRepositoryImpl(datasource);
    const todoController = new TodoController(todoRepository);
    router.get("/", todoController.getTodos);
    router.get("/:id", todoController.getTodoById);
    router.post("/", todoController.createTodo);
    router.put("/:id", todoController.updateTodo);
    router.delete("/:id", todoController.deleteTodo);
    return router;
  }
}
