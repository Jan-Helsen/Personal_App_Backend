import { Deadline, Habit, Todo } from "@prisma/client";

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