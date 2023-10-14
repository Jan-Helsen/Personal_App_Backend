import { UserOnExcercises } from "./UserOnExcercise";


export class Excercise {
    readonly id: number;
    readonly name: string;
    readonly img: string;
    readonly users: UserOnExcercises[];

    constructor(excercise: Excercise) {
        this.id = excercise.id;
        this.name = excercise.name;
        this.img = excercise.img;
        this.users = excercise.users;
    }
}