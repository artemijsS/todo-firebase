'use client'


import { useContext } from "react";
import { TodoContext } from "@/contexts/TodoProvider";
import { ITodoFull } from "@/types";
import React from "react";
import { Todo } from "@/components/todos/Todo";

interface Props {
    listId: string,
    title: string,
    isCompleted: boolean,
}

export const TodoList = ({ title, isCompleted, listId }: Props) => {

    const { todos } = useContext(TodoContext);

    return (
        <div className={""} id={listId}>
            <h2 className={"mb-4 font-bold text-lg"}>{title}</h2>
            <div className={"flex flex-col gap-2"}>
                {todos.filter((todo: ITodoFull) => todo.isCompleted === isCompleted).map((todo: ITodoFull) => {
                    return (
                        <React.Fragment key={todo.id}>
                            <Todo todo={todo} />
                        </React.Fragment>
                    )
                })}
            </div>
        </div>
    )
}