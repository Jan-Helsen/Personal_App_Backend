import { HabitInput, HabitDelete, HabitUpdateInput } from "../types";
import habitDb from "../domain/data-access/habit.db";
import { Habit } from "../domain/model/Habit";

const getAllHabits = async (): Promise<Habit[]> => {
    const habits = await habitDb.getAllHabits();
    if (habits.length === 0) {
        throw new Error("No habits found in the database.");
    }
    return habits;
};

const getHabitById = async ({ id }: HabitDelete): Promise<Habit> => {
    if (Number.isNaN(Number(id))) {
        throw new Error("id must be numeric.");
    };
    const habit = await habitDb.getHabitById({ id });
    if (!habit) {
        throw new Error(`Habit with ID: ${id} does not exist.`);
    };
    return habit;
};

const createHabit = async (habitInput: HabitInput): Promise<Habit> => {
    // checks schrijven voor juiste input
    const habit = await habitDb.createHabit(habitInput);
    return habit;
};

const updateHabit = async (habitUpdateInput: HabitUpdateInput): Promise<Habit> => {
    if (Number.isNaN(Number(habitUpdateInput.id))) {
        throw new Error("ID must be numeric.")
    };
    await habitDb.getHabitById({ id: habitUpdateInput.id });
    // checks schrijven voor input
    const habit = await habitDb.updateHabit(habitUpdateInput);
    return habit
};

const deleteHabitWithId = async ({ id }: HabitDelete): Promise<Habit> => {
    if (Number.isNaN(Number(id))) {
        throw new Error('ID must be numeric.')
    };
    await getHabitById({ id });
    const habit = await habitDb.deleteHabitWithId({ id });
    return habit;
};

export default {
    getAllHabits,
    getHabitById,
    createHabit,
    updateHabit,
    deleteHabitWithId,
};