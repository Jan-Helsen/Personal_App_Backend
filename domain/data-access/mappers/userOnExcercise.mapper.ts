import { UserOnExcercises as UserOnExcercisesPrisma, User as UserPrisma, Excercise as ExcercisePrisma } from "@prisma/client"
import { UserOnExcercises } from "../../model/UserOnExcercise"
import { mapToUser } from "./user.mapper"
import { mapToExcercise } from "./excercise.mapper"

const mapToUserOnExcercise = ({
    user,
    userId,
    excercise,
    excercisesId,
    eightRepMax,
    tenRepMax,
    twelveRepMax,
}: UserOnExcercisesPrisma & {
    user?: UserPrisma;
    excercise?: ExcercisePrisma;
}): UserOnExcercises => new UserOnExcercises({
    user: user ? mapToUser(user) : null,
    userId,
    excercise: excercise ? mapToExcercise(excercise) : null,
    excercisesId,
    eightRepMax,
    tenRepMax,
    twelveRepMax,
})

const mapToUserOnExcercises = (userOnExcercisesPrisma: UserOnExcercisesPrisma[]): UserOnExcercises[] => userOnExcercisesPrisma.map(mapToUserOnExcercise);

export { mapToUserOnExcercise, mapToUserOnExcercises };