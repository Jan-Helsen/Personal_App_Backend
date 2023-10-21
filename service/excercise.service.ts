import { ExcerciseInput, ExcerciseDelete, ExcerciseUpdateInput } from "../types";
import excerciseDb from "../domain/data-access/excercise.db";
import { Excercise } from "../domain/model/Excercise";

const getAllExcercises = async (): Promise<Excercise[]> => {
    const excercises = await excerciseDb.getAllExcercises();
    if (excercises.length === 0) {
        throw new Error("No excercises found in the database.");
    }
    return excercises;
};

const getExcerciseById = async ({ id }: ExcerciseDelete): Promise<Excercise> => {
    if (Number.isNaN(Number(id))) {
        throw new Error("id must be numeric.");
    };
    const excercise = await excerciseDb.getExcerciseById({ id });
    if (!excercise) {
        throw new Error(`Excercise with ID: ${id} does not exist.`);
    };
    return excercise;
};

const createExcercise = async (excerciseInput: ExcerciseInput): Promise<Excercise> => {
    const excercise = await excerciseDb.createExcercise(excerciseInput);
    return excercise;
};

const updateExcercise =async (excerciseUpdateInput: ExcerciseUpdateInput): Promise<Excercise> => {
    if (Number.isNaN(Number(excerciseUpdateInput.id))) {
        throw new Error('ID must be numeric.')
    };
    await getExcerciseById({ id: excerciseUpdateInput.id });
    const excercise = await excerciseDb.updateExcercise(excerciseUpdateInput);
    return excercise;
};

const deleteExcerciseWithId = async ({ id }: ExcerciseDelete): Promise<Excercise> => {
    if (Number.isNaN(Number(id))) {
        throw new Error('ID must be numeric.')
    };
    await getExcerciseById({ id });
    const excercise = await excerciseDb.deleteExcerciseWithId({ id });
    return excercise;
};

export default {
    getAllExcercises,
    getExcerciseById,
    createExcercise,
    updateExcercise,
    deleteExcerciseWithId,
};