import { User } from "./User";


export class Todo {
    readonly id: number;
    readonly name: string;
    readonly description: string;
    readonly user: User;
    readonly userId: number;

    constructor(todo: Todo) {
        this.id = todo.id;
        this.name = todo.name;
        this.description = todo.description;
        this.user = todo.user;
        this.userId = todo.userId;
    }
}