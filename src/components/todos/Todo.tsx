"use client";

import { ITodoFull } from "@/types";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import React, { useContext, useEffect, useRef, useState } from "react";
import { toast } from "@/components/ui/use-toast";
import { Checkbox } from "@/components/ui/checkbox";
import { TrashIcon } from "@radix-ui/react-icons";
import { Button } from "@/components/ui/button";
import { TodoContext } from "@/contexts/TodoProvider";
import { Icons } from "@/assets";

interface Props {
    todo: ITodoFull
}

export const Todo = ({ todo }: Props) => {

    const { updateTodo } = useContext(TodoContext);
    const titleRef = useRef<HTMLInputElement>(null);
    const [isCompleted, setIsCompleted] = useState<boolean>(todo.isCompleted);
    const [title, setTitle] = useState<string>(todo.title);

    useEffect(() => {
        setTitle(todo.title);
    }, [todo]);

    const onChange = (tmp: {title: string, isCompleted: boolean}) => {
        if (todo.loading) {
            toast({
                variant: "destructive",
                title: "Uh oh! Wait until loading"
            })
            setTitle(todo.title)
            return;
        }
        if (!tmp.title) {
            toast({
                variant: "destructive",
                title: "Uh oh! TODO title cant be empty :(",
                description: "Write something there!",
            })
            setTitle(todo.title);
            titleRef?.current?.focus()
            return;
        }
        updateTodo({ ...todo, isCompleted: tmp.isCompleted, title: tmp.title }, true);
    }

    const onDeleteClick = () => {
        console.log(1)
    }

    return (
        <Card id={todo.id} className={`${todo.isCompleted || todo.loading ? "shadow-none opacity-60" : ""} relative`}>
            <CardHeader>
                <CardTitle>
                    {todo.loading && (
                        <div className={"absolute top-1 right-0"}>
                            <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
                        </div>
                    )}
                    <div className={"flex items-center gap-3"}>
                        <Checkbox
                            onCheckedChange={() => {
                                if (todo.loading) return;
                                onChange({ title, isCompleted: !isCompleted })
                                setIsCompleted(!isCompleted);
                            }}
                            checked={isCompleted}
                            disabled={todo.loading}
                        />
                        <Input
                            onBlur={() => {
                                onChange({ title, isCompleted });
                            }}
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            ref={titleRef}
                            disabled={todo.loading}
                        />
                        <Button variant={"secondary"} onClick={() => onDeleteClick()} disabled={todo.loading}>
                            <TrashIcon />
                        </Button>
                    </div>
                </CardTitle>
            </CardHeader>
        </Card>
    )
}