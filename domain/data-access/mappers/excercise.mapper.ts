import { Excercise as ExcercisePrisma, UserOnExcercises as UserOnExcercisePrisma } from "@prisma/client";
import { Excercise } from "../../model/Excercise";


const mapToExcercise = ({
    id,
    name,
    img,
    users,
}: ExcercisePrisma & {
    users?: UserOnExcercisePrisma[];
}): Excercise => new Excercise({
    id,
    name,
    img,
    users: users ? [] : [],
})

const mapToExcercises = (excercisesPrisma: ExcercisePrisma[]): Excercise[] => excercisesPrisma.map(mapToExcercise);

export { mapToExcercise, mapToExcercises };