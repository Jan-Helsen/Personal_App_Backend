import database from "./database";
import { mapToUserOnExcercise, mapToUserOnExcercises } from "./mappers/userOnExcercise.mapper";
import { UserOnExcerciseInput, UserOnExcerciseUpdateInput, UserOnExcerciseDelete } from "../../types";

const addUserOnExcercise = async (userOnExcerciseInput: UserOnExcerciseInput) => {
    try {
        const userOnExcercisePrisma = await database.userOnExcercises.create({
            data: {
                userId: userOnExcerciseInput.userId,
                excercisesId: userOnExcerciseInput.excerciseId,
                eightRepMax: userOnExcerciseInput.eightRepMax,
                tenRepMax: userOnExcerciseInput.tenRepMax,
                twelveRepMax: userOnExcerciseInput.twelveRepMax,
            },
            include: {
                excercises: true,
            }
        });
        return mapToUserOnExcercise(userOnExcercisePrisma);
    } catch (error: any) {
        console.error(error);
        throw new Error(error.message);
    }
};

const deleteUserOnExcercise = async (userOnExcerciseDelete: UserOnExcerciseDelete) => {
    try {
        const userOnExcercisePrisma = await database.userOnExcercises.delete({
            where: {
                userId_excercisesId: {
                    userId: userOnExcerciseDelete.userId,
                    excercisesId: userOnExcerciseDelete.excerciseId,
                },
            },
            include: {
                excercises: true,
            }
        });
        return mapToUserOnExcercise(userOnExcercisePrisma);
    } catch (error: any) {
        console.error(error);
        throw new Error(error.message);
    }
};

const updateUserOnExcercise = async (userOnExcerciseUpdateInput: UserOnExcerciseUpdateInput) => {
    try {
        const userOnExcercisePrisma = await database.userOnExcercises.update({
            where: {
                userId_excercisesId: {
                    userId: userOnExcerciseUpdateInput.userId,
                    excercisesId: userOnExcerciseUpdateInput.excerciseId,
                },
            },
            data: {
                eightRepMax: userOnExcerciseUpdateInput.eightRepMax,
                tenRepMax: userOnExcerciseUpdateInput.tenRepMax,
                twelveRepMax: userOnExcerciseUpdateInput.twelveRepMax,
            },
            include: {
                excercises: true,
            }
        });
        return mapToUserOnExcercise(userOnExcercisePrisma);
    } catch (error: any) {
        console.error(error);
        throw new Error(error.message);
    }
};

const getUserOnExcercise = async (userOnExcerciseDelete: UserOnExcerciseDelete) => {
    try {
        const userOnExcercisePrisma = await database.userOnExcercises.findUnique({
            where: {
                userId_excercisesId: {
                    userId: userOnExcerciseDelete.userId,
                    excercisesId: userOnExcerciseDelete.excerciseId,
                },
            },
            include: {
                excercises: true,
            }
        });   
        if (userOnExcercisePrisma) {
            return mapToUserOnExcercise(userOnExcercisePrisma);
        }
        return null;
    } catch (error: any) {
        console.error(error);
        throw new Error(error.message);
    }
};

export default {
    addUserOnExcercise,
    deleteUserOnExcercise,
    updateUserOnExcercise,
    getUserOnExcercise,
};