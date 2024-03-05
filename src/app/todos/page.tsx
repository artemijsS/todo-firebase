import { CreateNewTodo, TodoLists } from "@/components/todos";

export default async function Todos() {

    return (
        <>
            <CreateNewTodo />
            <TodoLists />
        </>
    )
}
