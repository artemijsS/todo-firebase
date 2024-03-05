import { sendData, sendGet } from "@/lib/api/index";
import { ITodo, ITodoDto, ITodoFull } from "@/types";

// GET
export const getTodos = () => {
    return sendGet<{ data: ITodo[] }>({ url: "/api/todo" });
}

// POST
export const createTodo = (dto: ITodoDto) => {
    return sendData<ITodoFull>({ url: "/api/todo", data: dto });
}
