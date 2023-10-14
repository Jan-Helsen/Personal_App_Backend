import { User } from "./User";


export class Habit {
    readonly id: number;
    readonly name: string;
    readonly description: string;
    readonly updatedAt: Date;
    readonly streak: number;
    readonly user: User;
    readonly userId: number;

    constructor(habit: Habit) {
        this.id = habit.id;
        this.name = habit.name;
        this.description = habit.description;
        this.updatedAt = habit.updatedAt;
        this.streak = habit.streak;
        this.user = habit.user;
        this.userId = habit. userId;
    }
    }