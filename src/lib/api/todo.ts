import { sendData, sendDelete, sendGet } from "@/lib/api/index";
import { ITodo, ITodoDto, ITodoFull } from "@/types";

// GET
export const getTodos = () => {
    return sendGet<{ data: ITodo[] }>({ url: "/api/todo" });
}

// POST
export const createTodo = (dto: ITodoDto) => {
    return sendData<ITodoFull>({ url: "/api/todo", data: dto });
}

// PUT
export const updateTodoById = (dto: ITodoFull) => {
    return sendData<any>({ url: `/api/todo/${dto.id}`, data: dto, method: "PUT" });
}

// DELETE
export const removeTodoById = (id: string) => {
    return sendDelete<any>({ url: `/api/todo/${id}` });
}
