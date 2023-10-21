import { Todo as TodoPrisma, User as UserPrisma } from "@prisma/client"
import { Todo } from "../../model/Todo";
import { mapToUser } from "./user.mapper";

const mapToTodo = ({
    id,
    name,
    description,
    user,
    userId,
}: TodoPrisma & {
    user?: UserPrisma;
}): Todo => new Todo({
    id,
    name,
    description,
    user: user ? mapToUser(user) : null,
    userId,
})

const mapToTodos = (todoPrisma: TodoPrisma[]): Todo[] => todoPrisma.map(mapToTodo);

export { mapToTodo, mapToTodos };