import { Excercise } from "./Excercise";
import { User } from "./User";


export class UserOnExcercises {
    readonly user: User;
    readonly userId: number;
    readonly excercise: Excercise;
    readonly excercisesId: number;
    readonly eightRepMax: number;
    readonly tenRepMax: number;
    readonly twelveRepMax: number;

    constructor(userOnExcercises: UserOnExcercises) {
        this.user = userOnExcercises.user;
        this.userId = userOnExcercises.userId;
        this.excercise = userOnExcercises.excercise;
        this.excercisesId = userOnExcercises.excercisesId;
        this.eightRepMax = userOnExcercises.eightRepMax;
        this.tenRepMax = userOnExcercises.tenRepMax;
        this.twelveRepMax = userOnExcercises.twelveRepMax;
    }
}