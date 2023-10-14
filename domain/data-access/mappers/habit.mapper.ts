import { Habit as HabitPrisma, User as UserPrisma } from "@prisma/client"
import { Habit } from "../../model/Habit"
import { mapToUser } from "./user.mapper";

const mapToHabit = ({
    id,
    name,
    description,
    updatedAt,
    streak,
    user,
    userId,
}: HabitPrisma & {
    user?: UserPrisma;
}): Habit => new Habit({
    id,
    name,
    description,
    updatedAt,
    streak,
    user: user ? mapToUser(user) : null,
    userId,
})

const mapToHabits = (habitsPrisma: HabitPrisma[]): Habit[] => habitsPrisma.map(mapToHabit);

export { mapToHabit, mapToHabits };