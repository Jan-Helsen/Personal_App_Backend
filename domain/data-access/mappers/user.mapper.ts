import { User as UserPrisma, Todo as TodoPrisma, Habit as HabitPrisma, Deadline as DeadlinePrisma } from "@prisma/client"
import { mapToDeadlines } from "./deadline.mapper";
import { mapToHabits } from "./habit.mapper";
import { mapToTodos } from "./todo.mapper";
import { User } from "../../model/User"

const mapToUser = ({
    id,
    firstName,
    lastName,
    email,
    password,
    todos,
    habits,
    deadlines,
}: UserPrisma & {
    todos?: TodoPrisma[];
    habits?: HabitPrisma[];
    deadlines?: DeadlinePrisma[];
}): User => new User({
    id,
    firstName,
    lastName,
    email,
    password,
    todos: todos ? mapToTodos(todos) : [],
    habits: habits ? mapToHabits(habits) : [],
    deadlines: deadlines ? mapToDeadlines(deadlines) : [],
})

const mapToUsers = (usersPrisma: UserPrisma[]): User[] => usersPrisma.map(mapToUser);

export { mapToUser, mapToUsers };