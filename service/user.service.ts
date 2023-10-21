import { UserDelete, UserInput, UserLogin, UserUpdateInput } from "../types"
import userDb from "../domain/data-access/user.db"
import generateJwtToken from "../Util/jwt";
import { User } from "../domain/model/User"
import bcrypt from "bcrypt";

const getAllUsers = async (): Promise<User[]> => {
    const users = await userDb.getAllUsers();
    if (users.length == 0) { 
        throw new Error("No users found in database.")
    }
    return users;
};

const getUserById = async ({ id } : { id : string }): Promise<User> => {
    if (Number.isNaN(Number(id))) {
        throw new Error("id must be numeric.");
    }
    const user = await userDb.getUserById({ id: parseInt(id) })
    if (!user) {
        throw new Error(`User with ID: ${id} does not exist.`)
    }
    return user;
};

const getUserByEmail = async ({ email } : { email: string }): Promise<User> => {
    const user = await userDb.getUserByEmail({ email });
    if (!user) {
        throw new Error(`User with email: ${email} does not exist.`)
    }
    return user;
};

const createUser = async (userInput: UserInput): Promise<User> => {
    const existingUser = await userDb.getUserByEmail({ email: userInput.email })
    if (existingUser) {
        throw new Error(`User with email ${userInput.email} is already registered`);
    }
    // Eerst de rest afmaken
    // userInput.todosIds.forEach(async (id) => {
    //     await 
    // })
    // userInput.habitsIds.forEach(async (id) => {
    //     await 
    // })
    // userInput.deadlinesIds.forEach(async (id) => {
    //     await 
    // })
    const hashedPassword = await bcrypt.hash(userInput.password, 12);
    const user = await userDb.createUser({
        firstName: userInput.firstName,
        lastName: userInput.lastName,
        email: userInput.email,
        password: hashedPassword,
        todosIds: userInput.todosIds,
        habitsIds: userInput.habitsIds,
        deadlinesIds: userInput.deadlinesIds,
    });
    return user;
};

const updateUser = async (userUpdate: UserUpdateInput): Promise<User> => {
    if (Number.isNaN(Number(userUpdate.id))) {
        throw new Error("ID must be numeric.")
    }
    await getUserById({ id: userUpdate.id.toString() })
    const hashedPassword = await bcrypt.hash(userUpdate.password, 12)
    const user = await userDb.updateUser({
        id: userUpdate.id,
        firstName: userUpdate.firstName,
        lastName: userUpdate.lastName,
        email: userUpdate.email,
        password: hashedPassword,
        todosIds: userUpdate.todosIds,
        habitsIds: userUpdate.habitsIds,
        deadlinesIds: userUpdate.deadlinesIds,
    });
    return user;
};

const deleteUserWithId = async ({ id }: UserDelete): Promise<User> => {
    if (Number.isNaN(Number(id))) {
        throw new Error('ID must be numeric.')
    }
    await getUserById({ id: id.toString() })
    const user = await userDb.deleteUserWithId({ id });
    return user;
};

const authenticate = async ({ email, password }: UserLogin): Promise<string> => {
    const user = await getUserByEmail({email})
    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) {
        throw new Error("Incorrect password.")
    }
    return generateJwtToken(email);
};

export default {
    getAllUsers,
    getUserById,
    getUserByEmail,
    createUser,
    updateUser,
    deleteUserWithId,
    authenticate,
};