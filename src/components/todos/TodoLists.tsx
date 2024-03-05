"use client"


import { TodoList } from "@/components/todos/TodoList";
import React, { useContext } from "react";
import { TodoContext } from "@/contexts/TodoProvider";
import { Icons } from "@/assets";

export const TodoLists = () => {

    const { loading } = useContext(TodoContext);

    return (
        <div className={`container ${loading ? "mt-40" : "grid grid-cols-2 gap-4 mt-4"} mb-8`}>
            {loading
                ?
                    <div className={"relative w-full"}>
                        <div className={"absolute top-1/2 left-1/2 -translate-x-1/2"}>
                            <Icons.spinner className="mr-2 h-32 w-32 animate-spin" />
                        </div>
                    </div>
                :
                    <>
                        <TodoList listId={"todo"} title={"Todo"} isCompleted={false} />
                        <TodoList listId={"done"} title={"Done"} isCompleted={true} />
                    </>
            }
        </div>
    )
}