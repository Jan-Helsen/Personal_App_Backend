import { HabitInput, HabitDelete, HabitUpdateInput } from "../../types";
import { mapToHabit, mapToHabits } from "./mappers/habit.mapper";
import { Habit } from "../model/Habit";
import database from "./database";

const getAllHabits = async (): Promise<Habit[]> => {
    try {
        const habitPrisma = await database.habit.findMany({
            include: { user: true },
        });
        return mapToHabits(habitPrisma);
    } 
    catch (error) {
        console.log(error)
        throw new Error("error database check logs")
    }
};

const getHabitById = async ({ id }: HabitDelete): Promise<Habit> => {
    try {
        const habitPrisma = await database.habit.findUnique({
            where: { id },
            include: { user: true },
        });
        if (habitPrisma) {
            return mapToHabit(habitPrisma);
        }
        return null
    } 
    catch (error) {
        console.log(error)
        throw new Error("error database check logs")
    }
};

const createHabit = async (habit: HabitInput): Promise<Habit> => {
    try {
        const habitPrisma = await database.habit.create({
            data: {
                name: habit.name,
                description: habit.description,
                streak: habit.streak,
                userId: habit.userId,
            }
        });
        return mapToHabit(habitPrisma); 
    } 
    catch (error) {
        console.log(error)
        throw new Error("error database check logs")
    }
};

const updateHabit = async (habitUpdateInput: HabitUpdateInput): Promise<Habit> => {
    try {
        const habitPrisma = await database.habit.update({
            where: { id: habitUpdateInput.id },
            data: {
                name: habitUpdateInput.name,
                description: habitUpdateInput.description,
                streak: habitUpdateInput.streak,
                userId: habitUpdateInput.userId,
            }
        });
        return mapToHabit(habitPrisma);
    } 
    catch (error) {
        console.log(error)
        throw new Error("error database check logs")
    }
};

const deleteHabitWithId = async ({ id }: HabitDelete): Promise<Habit> => {
    try {
        const habitPrisma = await database.habit.delete({
            where: { id },
        });
        return mapToHabit(habitPrisma);
    } 
    catch (error) {
        console.log(error)
        throw new Error("error database check logs")
    }
};

export default {
    getAllHabits,
    getHabitById,
    createHabit,
    updateHabit,
    deleteHabitWithId,
};