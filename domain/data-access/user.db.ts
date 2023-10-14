import { UserDelete, UserInput, UserEmail, UserUpdateInput } from "../../types";
import { mapToUser, mapToUsers } from "./mappers/user.mapper";
import { User } from "../model/User";
import database from "./database"


const getAllUsers = async (): Promise<User[]> => {
    try {
        const usersPrisma = await database.user.findMany({
            include: { todos: true, habits: true, deadlines: true },
        });
        return mapToUsers(usersPrisma);
    }
    catch (error) {
        console.log(error)
        throw new Error("error database check logs")
    }
};

const getUserById = async ({ id }: UserDelete): Promise<User> => {
    try {
        const userPrisma = await database.user.findUnique({
            where: { id },
            include: { todos: true, habits: true, deadlines: true },
        });
        if (userPrisma) {
            return mapToUser(userPrisma);
        }
        return null;
    } 
    catch (error) {
        console.log(error)
        throw new Error("error database check logs")
    }
}

const getUserByEmail = async ({ email } : UserEmail): Promise<User> => {
    try {
        const userPrisma = await database.user.findFirst({
            where: { email },
            include: { todos: true, habits: true, deadlines: true },
        });
        if (userPrisma) {
            return mapToUser(userPrisma);
        }
        return null;
    }
    catch (error) {
        console.log(error)
        throw new Error("error database check logs")
    }
}

const createUser = async (user : UserInput): Promise<User> => {
    try {
        const userPrisma = await database.user.create({
            data: {
                firstName: user.firstName,
                lastName: user.lastName,
                email: user.email,
                password: user.password,
                todos: {
                    connect: [
                        ...user.todosIds.map(id => {
                            return { id };
                        }),
                    ],
                },
                habits: {
                    connect: [
                        ...user.habitsIds.map(id => {
                            return { id };
                        })
                    ]
                },
                deadlines: {
                    connect: [
                        ...user.deadlinesIds.map(id => {
                            return { id };
                        })
                    ]
                },
            },
        });
        return mapToUser(userPrisma)
    } 
    catch (error) {
        console.log(error)
        throw new Error("error database check logs")
    }
}

const updateUser = async (userUpdateInput : UserUpdateInput): Promise<User> => {
    try {
        const userPrisma = await database.user.update({
            where: { id: userUpdateInput.id },
            data: {
                firstName: userUpdateInput.firstName,
                lastName: userUpdateInput.lastName,
                email: userUpdateInput.lastName,
                password: userUpdateInput.password,
                todos: {
                    connect: [
                        ...userUpdateInput.todosIds.map(id => {
                            return { id };
                        }),
                    ],
                },
                habits: {
                    connect: [
                        ...userUpdateInput.habitsIds.map(id => {
                            return { id };
                        })
                    ]
                },
                deadlines: {
                    connect: [
                        ...userUpdateInput.deadlinesIds.map(id => {
                            return { id };
                        })
                    ]
                }
            }
        });
        return mapToUser(userPrisma);
    } 
    catch (error) {
        console.log(error)
        throw new Error("error database check logs")
    }
}

const deleteUserWithId = async ({ id }: UserDelete) => {
    try {
        const userPrisma = await database.user.delete({
            where: { id }
        });
        return mapToUser(userPrisma);
    } catch (error) {
        console.log(error)
        throw new Error("error database check logs")
    }
}

export default {
    getAllUsers,
    getUserById,
    getUserByEmail,
    createUser,
    updateUser,
    deleteUserWithId,
}