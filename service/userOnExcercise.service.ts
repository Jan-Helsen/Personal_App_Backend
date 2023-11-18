import userOnExcerciseDb from "../domain/data-access/userOnExcercise.db";
import { UserOnExcercises } from "../domain/model/UserOnExcercise";
import { UserOnExcerciseInput, UserOnExcerciseUpdateInput, UserOnExcerciseDelete } from "../types";

const addUserOnExcercise = async (userOnExcercise: UserOnExcerciseInput): Promise<UserOnExcercises> => {
    return await userOnExcerciseDb.addUserOnExcercise(userOnExcercise);
};

const deleteUserOnExcercise = async (userOnExcerciseDelete: UserOnExcerciseDelete): Promise<UserOnExcercises> => {
    return await userOnExcerciseDb.deleteUserOnExcercise(userOnExcerciseDelete);
};

const updateUserOnExcercise = async (userOnExcerciseUpdateInput: UserOnExcerciseUpdateInput): Promise<UserOnExcercises> => {
    return await userOnExcerciseDb.updateUserOnExcercise(userOnExcerciseUpdateInput);
};

const getUserOnExcercise = async (userOnExcerciseDelete: UserOnExcerciseDelete): Promise<UserOnExcercises> => {
    return await userOnExcerciseDb.getUserOnExcercise(userOnExcerciseDelete);
};

export default {
    addUserOnExcercise,
    deleteUserOnExcercise,
    updateUserOnExcercise,
    getUserOnExcercise
};
