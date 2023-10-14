import { Deadline as DeadlinePrisma, User as UserPrisma } from "@prisma/client"
import { Deadline } from "../../model/Deadline"
import { mapToUser } from "./user.mapper";

const mapToDeadline = ({
    id,
    name,
    description,
    endDate,
    user,
    userId,
}: DeadlinePrisma & {
    user?: UserPrisma;
}): Deadline => new Deadline({
    id,
    name,
    description,
    endDate,
    user: user ? mapToUser(user) : null,
    userId,
})

const mapToDeadlines = (deadlinesPrisma: DeadlinePrisma[]): Deadline[] => deadlinesPrisma.map(mapToDeadline);

export { mapToDeadline, mapToDeadlines };