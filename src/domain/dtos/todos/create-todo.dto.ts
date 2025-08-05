export class CreateTodoDto {
  private constructor(public readonly title: string) {}

  static create(props: { [key: string]: any }): [string?, CreateTodoDto?] {
    try {
      const { title } = props;
      if (!title) return ["Title property is required", undefined];
      return [undefined, new CreateTodoDto(title)];
    } catch (error) {
      return [(error as Error).message, undefined];
    }
  }
}
