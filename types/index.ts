export type UserInput = {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    todosIds: number[];
    habitsIds: number[];
    deadlinesIds: number[];
}

export type UserDelete = {
    id: number;
}

export type UserEmail = {
    email: string;
}

export type UserUpdateInput = {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    todosIds: number[];
    habitsIds: number[];
    deadlinesIds: number[];
}

export type UserLogin = {
    email: string;
    password: string;
}

export type FriendsInput = {
    userIdA: number,
    userIdB: number,
}

export type HabitInput = {
    name: string;
    description: string;
    streak: number;
    userId: number;
}

export type HabitDelete = {
    id: number;
}

export type HabitUpdateInput = {
    id: number;
    name: string;
    description: string;
    streak: number;
    userId: number;
}

export type TodoInput = {
    name: string;
    description: string;
    userId: number;
}

export type TodoDelete = {
    id: number;
}

export type TodoUpdateInput = {
    id: number;
    name: string;
    description: string;
    userId: number;
}

export type DeadlineInput = {
    name: string;
    subject: string;
    description: string;
    endDate: Date;
    userId: number;
}

export type DeadlineUpdateInput = {
    id: number;
    name: string;
    subject: string;
    description: string;
    endDate: Date;
    userId: number;
}

export type DeadlineDelete = {
    id: number;
}

export type ExcerciseInput = {
    name: string;
    img: string;
}

export type ExcerciseUpdateInput = {
    id: number;
    name: string;
    img: string;
}

export type ExcerciseDelete = {
    id: number;
}

export type UserOnExcerciseInput = {
    userId: number;
    excerciseId: number;
    eightRepMax: number;
    tenRepMax: number;
    twelveRepMax: number;
}

export type UserOnExcerciseUpdateInput = {
    userId: number;
    excerciseId: number;
    eightRepMax: number;
    tenRepMax: number;
    twelveRepMax: number;
}

export type UserOnExcerciseDelete = {
    userId: number;
    excerciseId: number;
}