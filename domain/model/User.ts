import { UserInput } from "../../types";
import { Deadline } from "./Deadline";
import { Habit } from "./Habit";
import { Todo } from "./Todo";


export class User {
    readonly id: number;
    readonly firstName: string;
    readonly lastName: string;
    readonly email: string;
    readonly password: string;
    readonly todos: Todo[];
    readonly habits: Habit[];
    readonly deadlines: Deadline[];

    constructor(user: User) {
        this.id = user.id;
        this.firstName = user.firstName;
        this.lastName = user.lastName;
        this.email = user.email;
        this.password = user.password;
        this.todos = user.todos;
        this.habits = user.habits;
        this.deadlines = user.deadlines;
    }

}