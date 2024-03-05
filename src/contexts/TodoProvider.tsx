"use client"


import React, { createContext, useEffect, useState } from "react";
import { ITodoFull, ITodoDto, ITodo } from "@/types";
import { generateRandomId, getErrorMessage } from "@/lib/utils";
import { createTodo, getTodos } from "@/lib/api";
import { toast } from "@/components/ui/use-toast";

interface ITodoContext {
    todos: ITodoFull[];
    loading: boolean;
    createNewTodo: (todo: ITodoDto) => void;
    updateTodo: (todo: ITodoFull, apiUpdate?: boolean) => void;
    deleteTodo: (todo: ITodoFull) => void;
}

// @ts-ignore
export const TodoContext = createContext<ITodoContext>(null);

interface TodoProviderProps {
    children: React.ReactNode;
}

export const TodoProvider = ({ children }: TodoProviderProps) => {

    const [todos, setTodos] = useState<ITodoFull[]>([]);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        getTodos().then((res: { data: ITodo[] }) => {
            setTodos(res.data);
        }).catch(e => {
            toast({
                variant: "destructive",
                title: getErrorMessage(e, "Error with loading your Todos :("),
                description: "Try again!",
            })
        }).finally(() => setLoading(false));
    }, []);

    const createNewTodo = (dto: ITodoDto) => {
        const randomId = generateRandomId(8);
        const timeNow = String(new Date().getTime());
        const dtoFull = {...dto, owner: "me", isCompleted: false, createdAt: timeNow, updatedAt: timeNow, id: randomId, loading: true, new: true }
        setTodos([
            dtoFull,
            ...todos
        ]);
        createTodo(dto).then((res: ITodoFull) => {
            updateTodo(res, false, randomId);
        }).catch((e) => {
            deleteTodo(dtoFull);
            toast({
                variant: "destructive",
                title: getErrorMessage(e, "Error with creating your Todo :("),
                description: "Try again!",
            })
        })
    }

    const updateTodo = (dto: ITodoFull, apiUpdate?: boolean, id?: string) => {
        setTodos(p => {
            const findId = id || dto.id;
            const index = p.findIndex(t => t.id === findId);
            if (index < 0) return p;
            const tmp = Array.from(p);
            tmp[index] = { ...dto, loading: !!apiUpdate };
            return tmp;
        })
    }

    const deleteTodo = (dto: ITodoFull) => {
        const index = todos.findIndex(t => t.id === dto.id);
        setTodos(p => {
            const tmp = Array.from(p);
            tmp[index] = { ...dto, deleting: true, loading: true };
            return tmp;
        })
        if (dto.new) {
            setTimeout(() => {
                setTodos(prevTodos => prevTodos.filter(todo => todo.id !== dto.id));
            }, 200)
        }
    }

    return (
        <TodoContext.Provider value={{ todos, loading, createNewTodo, updateTodo, deleteTodo }}>
            {children}
        </TodoContext.Provider>
    )
}