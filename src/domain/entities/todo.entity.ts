export class TodoEntity {
  constructor(
    public readonly id: number,
    public readonly title: string,
    public readonly completedAt?: Date | null
  ) {}

  get isCompleted(): boolean {
    return !!this.completedAt;
  }
  public static fromOject(obj: { [key: string]: any }): TodoEntity {
    const { id, title, completedAt } = obj;
    if (!id || isNaN(Number(id))) throw new Error("ID property is required");
    if (!title) throw new Error("Title property is required");
    let newCompletedAt = completedAt;

    if (completedAt) {
      newCompletedAt = new Date(completedAt);
      if (newCompletedAt.toString() === "Invalid Date")
        throw new Error("CompletedAt property is not a valid date");
    }
    return new TodoEntity(id, title, completedAt);
  }
}
