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
            data: {
                name: deadlineInput.name,
                subject: deadlineInput.subject,
                description: deadlineInput.description,
                endDate: new Date(deadlineInput.endDate),
                userId: deadlineInput.userId,
            },
        })
        return mapToDeadline(deadlinePrisma) 
    } 
    catch (error) {
        console.log(error)
        throw new Error("error database check logs")
    }
};

const updateDeadline = async (deadlineUpdateInput: DeadlineUpdateInput): Promise<Deadline> => {
    try {
        const deadlinePrisma = await database.deadline.update({
            where: { id: deadlineUpdateInput.id },
            data: {
                name: deadlineUpdateInput.name,
                subject: deadlineUpdateInput.subject,
                description: deadlineUpdateInput.description,
                endDate: new Date(deadlineUpdateInput.endDate),
                userId: deadlineUpdateInput.userId,
            },
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