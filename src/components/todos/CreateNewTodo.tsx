"use client";

import { Dialog } from "@radix-ui/react-dialog";
import {
    DialogClose,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Label } from "@radix-ui/react-label";
import { Input } from "@/components/ui/input";
import { FormEvent, useContext, useRef, useState } from "react";
import { TodoContext } from "@/contexts/TodoProvider";
import { toast } from "@/components/ui/use-toast";


export const CreateNewTodo = () => {

    const closeRef = useRef<HTMLButtonElement>(null);
    const [title, setTitle] = useState<string>("");
    const { createNewTodo } = useContext(TodoContext);

    const onSubmit = (e?: FormEvent) => {
        e?.preventDefault();
        if (!title) {
            toast({
                variant: "destructive",
                title: "Uh oh! TODO title cant be empty :(",
                description: "Write something there!",
            });
            return;
        }

        createNewTodo({ title });
        closeRef?.current?.click();
    }

    return (
        <div className={"container"}>
            <Dialog>
                <DialogTrigger asChild={true}>
                    <Button variant="outline" className={"mt-4 w-full"}>Add New</Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-md">
                    <DialogHeader>
                        <DialogTitle>Create New TODO</DialogTitle>
                    </DialogHeader>
                    <div className="flex items-center space-x-2">
                        <div className="grid flex-1 gap-2">
                            <form onSubmit={onSubmit}>
                                <Label htmlFor="title" className="sr-only">
                                    Title
                                </Label>
                                <Input
                                    id="title"
                                    value={title}
                                    onChange={(e) => setTitle(e.target.value)}
                                />
                            </form>
                        </div>
                    </div>
                    <DialogFooter className="sm:justify-end">
                        <DialogClose asChild>
                            <Button type="button" variant="secondary" ref={closeRef}>
                                Close
                            </Button>
                        </DialogClose>
                        <Button type="button" variant="default" onClick={() => onSubmit()}>
                            Create
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    )
}