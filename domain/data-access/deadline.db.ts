import { DeadlineInput, DeadlineDelete, DeadlineUpdateInput } from "../../types";
import { mapToDeadline, mapToDeadlines } from "./mappers/deadline.mapper";
import { Deadline } from "../model/Deadline";
import database from "./database";

const getAllDeadlines = async (): Promise<Deadline[]> => {
    try {
        const deadlinesPrisma = await database.deadline.findMany({
            include: { user: true },
        });
        return mapToDeadlines(deadlinesPrisma);
    } 
    catch (error) {
        console.log(error)
        throw new Error("error database check logs")
    }
};

const getDeadlineById = async ({ id }: DeadlineDelete): Promise<Deadline> => {
    try {
        const deadlinePrisma = await database.deadline.findUnique({
            where: { id },
            include: { user: true },
        });
        if (deadlinePrisma) {
            return mapToDeadline(deadlinePrisma);
        }
        return null;
    } 
    catch (error) {
        console.log(error)
        throw new Error("error database check logs")
    }
};

const createDeadline = async (deadlineInput: DeadlineInput): Promise<Deadline> => {
    try {
        const deadlinePrisma = await database.deadline.create({
            data: deadlineInput,
        })
        return mapToDeadline(deadlinePrisma) 
    } 
    catch (error) {
        
    }
};

const updateDeadline = async (deadlineUpdateInput: DeadlineUpdateInput): Promise<Deadline> => {
    try {
        const deadlinePrisma = await database.deadline.update({
            where: { id: deadlineUpdateInput.id },
            data: deadlineUpdateInput,
        })
        return mapToDeadline(deadlinePrisma);
    } 
    catch (error) {
        console.log(error)
        throw new Error("error database check logs")    
    }
};

const deleteDeadlineWithId = async ({ id }: DeadlineDelete): Promise<Deadline> => {
    try {
        const deadlinePrisma = await database.deadline.delete({
            where: { id },
        });
        return mapToDeadline(deadlinePrisma);
    } 
    catch (error) {
        console.log(error)
        throw new Error("error database check logs")
    }
};

export default {
    getAllDeadlines,
    getDeadlineById,
    createDeadline,
    updateDeadline,
    deleteDeadlineWithId,
};