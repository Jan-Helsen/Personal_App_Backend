import { DeadlineInput, DeadlineDelete, DeadlineUpdateInput } from "../types";
import deadlineDb from "../domain/data-access/deadline.db";
import { Deadline } from "../domain/model/Deadline";

const getAllDeadlines = async (): Promise<Deadline[]> => {
    const deadlines = await deadlineDb.getAllDeadlines();
    if (deadlines.length === 0) {
        throw new Error("No deadlines found in the database.");
    }
    return deadlines;
};

const getDeadlineById = async ({ id }: DeadlineDelete): Promise<Deadline> => {
    if (Number.isNaN(Number(id))) {
        throw new Error("id must be numeric.");
    };
    const deadline = await deadlineDb.getDeadlineById({ id });
    if (!deadline) {
        throw new Error(`Deadline with ID: ${id} doesn not exist.`);
    }
    return deadline;
};

const createDeadline = async (deadlineInput: DeadlineInput): Promise<Deadline> => {
    const deadline = await deadlineDb.createDeadline(deadlineInput);
    return deadline;
};

const updateDeadline = async (deadlineUpdateInput: DeadlineUpdateInput): Promise<Deadline> => {
    if (Number.isNaN(Number(deadlineUpdateInput.id))) {
        throw new Error('ID must be numeric.')
    };
    await getDeadlineById({ id: deadlineUpdateInput.id });
    const deadline = await deadlineDb.updateDeadline(deadlineUpdateInput);
    return deadline;
};

const deleteDeadlineWithId = async ({ id }: DeadlineDelete): Promise<Deadline> => {
    if (Number.isNaN(Number(id))) {
        throw new Error('ID must be numeric.')
    };
    await getDeadlineById({ id });
    const deadline = await deadlineDb.deleteDeadlineWithId({ id });
    return deadline;
}; 

export default {
    getAllDeadlines,
    getDeadlineById,
    createDeadline,
    updateDeadline,
    deleteDeadlineWithId,
};