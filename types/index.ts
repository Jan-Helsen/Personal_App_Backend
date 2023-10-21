
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

export type HabitInput = {
    name: string;
    description: string;
    updatedAt: Date;
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
    updatedAt: Date;
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