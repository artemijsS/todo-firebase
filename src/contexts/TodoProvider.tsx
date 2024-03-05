"use client"


import React, { createContext, useEffect, useState } from "react";
import { ITodoFull, ITodoDto, ITodo } from "@/types";
import { generateRandomId, getErrorMessage } from "@/lib/utils";
import { createTodo, getTodos, removeTodoById, updateTodoById } from "@/lib/api";
import { toast } from "@/components/ui/use-toast";

interface ITodoContext {
    todos: ITodoFull[];
    loading: boolean;
    createNewTodo: (todo: ITodoDto) => void;
    updateTodo: (todo: ITodoFull, options?: {id?: string, fallback?: ITodoFull}) => void;
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
            setTodos(res.data.map(t => ({ ...t, key: t.id })));
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
        const dtoFull = {...dto, owner: "me", isCompleted: false, createdAt: timeNow, updatedAt: timeNow, id: randomId, loading: true, new: true, key: randomId }
        setTodos([
            dtoFull,
            ...todos
        ]);
        createTodo(dto).then((res: ITodoFull) => {
            updateTodo({ ...res, key: randomId }, { id: randomId });
        }).catch((e) => {
            deleteTodo(dtoFull);
            toast({
                variant: "destructive",
                title: getErrorMessage(e, "Error with creating your Todo :("),
                description: "Try again!",
            })
        })
    }

    const updateTodo = (dto: ITodoFull, options?: {id?: string, fallback?: ITodoFull}) => {
        setTodos(p => changeById(p, { ...dto, loading: !!options?.fallback }, options?.id))
        if (options?.fallback) {
            updateTodoById(dto).then(() => {
                setTodos(p => changeById(p, { ...dto, loading: false }));
            }).catch((e) => {
                setTodos(p => changeById(p, options.fallback as ITodoFull))
                toast({
                    variant: "destructive",
                    title: getErrorMessage(e, "Error with updating your Todo :("),
                    description: "Try again!",
                })
            })
        }
    }

    const deleteTodo = (dto: ITodoFull) => {
        setTodos(p => changeById(p, { ...dto, deleting: true, loading: true }))

        removeTodoById(dto.id).then(() => {
            setTodos(p => p.filter(t => t.id !== dto.id))
        }).catch(e => {
            setTodos(p => changeById(p, dto));
            toast({
                variant: "destructive",
                title: getErrorMessage(e, "Error with deleting your Todo :("),
                description: "Try again!",
            })
        })
    }

    const changeById = (todoList: ITodoFull[], changedTodo: ITodoFull, updateId?: string) => {
        const index = todoList.findIndex(t => t.id === (updateId || changedTodo.id));
        if (index < 0) return todoList;
        const tmp = Array.from(todoList);
        tmp[index] = { ...changedTodo };
        return tmp;
    }

    return (
        <TodoContext.Provider value={{ todos, loading, createNewTodo, updateTodo, deleteTodo }}>
            {children}
        </TodoContext.Provider>
    )
}