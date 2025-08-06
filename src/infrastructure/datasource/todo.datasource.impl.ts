import { prisma } from "../../data/postgres";
import {
  CreateTodoDto,
  TodoDataSource,
  TodoEntity,
  UpdateTodoDto,
} from "../../domain";

export class TodoDataSourceImpl implements TodoDataSource {
  async create(createTodoDto: CreateTodoDto): Promise<TodoEntity> {
    const newTodo = await prisma.todo.create({ data: createTodoDto! });
    return TodoEntity.fromOject(newTodo);
  }
  async getAll(): Promise<TodoEntity[]> {
    const todos = await prisma.todo.findMany();
    return todos.map((todo) => TodoEntity.fromOject(todo));
  }
  async findById(id: number): Promise<TodoEntity> {
    const todo = await prisma.todo.findUnique({
      where: { id: Number(id) },
    });
    if (!todo) throw new Error(`Todo with id ${id} not found`);
    return TodoEntity.fromOject(todo);
  }
  async updateById(updateTodoDto: UpdateTodoDto): Promise<TodoEntity> {
    const todo = await this.findById(updateTodoDto.id);
    const updatedTodo = await prisma.todo.update({
      where: { id: updateTodoDto.id },
      data: updateTodoDto!.values,
    });
    return TodoEntity.fromOject(updatedTodo);
  }
  async deleteById(id: number): Promise<TodoEntity> {
    await this.findById(id);
    const deletedTodo = await prisma.todo.delete({ where: { id: Number(id) } });
    if (!deletedTodo) throw new Error(`Todo with id ${id} not found`);
    return TodoEntity.fromOject(deletedTodo);
  }
}
