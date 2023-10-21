import { User } from "./User";


export class Deadline {
    readonly id: number;
    readonly name: string;
    readonly subject: string;
    readonly description: string;
    readonly endDate: Date;
    readonly user: User;
    readonly userId: number;

    constructor(deadline: Deadline) {
        this.id = deadline.id;
        this.name = deadline.name;
        this.description = deadline.description;
        this.endDate = deadline.endDate;
        this.user = deadline.user;
        this.userId = deadline.userId;
    }
}