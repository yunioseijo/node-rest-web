export class UpdateTodoDto {
  private constructor(
    public readonly id: number,
    public readonly title?: string,
    public readonly completedAt?: Date
  ) {}

  get values() {
    const returnObj: { [key: string]: any } = {};
    if (this.title) returnObj.title = this.title;
    if (this.completedAt) returnObj.completedAt = this.completedAt;
    return returnObj;
  }

  static create(props: { [key: string]: any }): [string?, UpdateTodoDto?] {
    try {
      const { id, title, completedAt } = props;
      if (!id || isNaN(Number(id)))
        return ["ID property is required", undefined];
      let newCompletedAt = completedAt;

      if (completedAt) {
        newCompletedAt = new Date(completedAt);
        if (newCompletedAt.toString() === "Invalid Date")
          return ["CompletedAt property is not a valid date", undefined];
      }
      return [undefined, new UpdateTodoDto(id, title, newCompletedAt)];
    } catch (error) {
      return [(error as Error).message, undefined];
    }
  }
}
