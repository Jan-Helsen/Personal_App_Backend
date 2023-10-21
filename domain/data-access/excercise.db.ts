import { ExcerciseInput, ExcerciseDelete, ExcerciseUpdateInput } from "../../types";
import { mapToExcercise, mapToExcercises } from "./mappers/excercise.mapper";
import { Excercise } from "../model/Excercise";
import database from "./database";

const getAllExcercises = async (): Promise<Excercise[]> => {
    try {
        const excercisesPrisma = await database.excercise.findMany();
        return mapToExcercises(excercisesPrisma);    
    } 
    catch (error) {
        console.log(error)
        throw new Error("error database check logs")
    }
};

const getExcerciseById = async ({ id }: ExcerciseDelete): Promise<Excercise> => {
    try {
        const excercisePrisma = await database.excercise.findUnique({
            where: { id },
        });
        if (excercisePrisma) {
            return mapToExcercise(excercisePrisma);
        }
        return null;
    } 
    catch (error) {
        console.log(error)
        throw new Error("error database check logs")
    }
};

const createExcercise = async (excerciseInput: ExcerciseInput): Promise<Excercise> => {
    try {
        const excercisePrisma = await database.excercise.create({
            data: excerciseInput,
        });
        if (excercisePrisma) {
            return mapToExcercise(excercisePrisma);
        }
        return null;
    } 
    catch (error) {
        console.log(error)
        throw new Error("error database check logs")
    }
};

const updateExcercise = async (excerciseUpdateInput: ExcerciseUpdateInput): Promise<Excercise> => {
    try {
        const excercisePrisma = await database.excercise.update({
            where: { id: excerciseUpdateInput.id },
            data: excerciseUpdateInput,
        });
        return mapToExcercise(excercisePrisma);
    } 
    catch (error) {
        console.log(error)
        throw new Error("error database check logs")
    }
};

const deleteExcerciseWithId = async ({ id }: ExcerciseDelete): Promise<Excercise> => {
    try {
        const excercisePrisma = await database.excercise.delete({
            where: { id },
        });
        return mapToExcercise(excercisePrisma);
    } 
    catch (error) {
        console.log(error)
        throw new Error("error database check logs")
    }
};

export default {
    getAllExcercises,
    getExcerciseById,
    createExcercise,
    updateExcercise,
    deleteExcerciseWithId,
};