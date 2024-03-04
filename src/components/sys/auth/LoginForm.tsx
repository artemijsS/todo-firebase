"use client"


import React, { FormEvent, useState } from "react";
import { Button, buttonVariants } from "@/components/ui/button";
import { cn, getErrorMessage } from "@/lib/utils";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Icons } from "@/assets";
import Link from "next/link";
import { LinksEnum } from "@/enums";
import { signIn } from "next-auth/react";
import { loginUser } from "@/lib/api";

interface UserAuthFormProps extends React.HTMLAttributes<HTMLDivElement> {}

export const LoginForm = ({ className, ...props }: UserAuthFormProps) => {

    const [form, setForm] = useState<{email: string, password: string}>({ email: "", password: "" });
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [error, setError] = useState<string>("");

    const onSubmit = (e: FormEvent) => {
        e.preventDefault();
        setError("");
        setIsLoading(true);

        loginUser(form).then(() => {
            signIn("credentials", { email: form.email, password: form.password });
        }).catch((e) => {
            setError(getErrorMessage(e, "Invalid data"));
        }).finally(() => {
            setIsLoading(false)
        })
    }

    return (
        <div className={cn("grid gap-6", className)} {...props}>
            <form onSubmit={onSubmit}>
                <div className="grid gap-2">
                    <div className="grid gap-1">
                        <Label className="sr-only" htmlFor="email">
                            Email
                        </Label>
                        <Input
                            id="email"
                            placeholder="name@example.com"
                            type="email"
                            autoCapitalize="none"
                            autoComplete="email"
                            autoCorrect="off"
                            disabled={isLoading}
                            onChange={(e) => setForm({ ...form, email: e.target.value })}
                        />
                    </div>
                    <div className="grid gap-1">
                        <Label className="sr-only" htmlFor="password">
                            Password
                        </Label>
                        <Input
                            id="password"
                            placeholder="******"
                            type="password"
                            autoCapitalize="none"
                            autoComplete="password"
                            autoCorrect="off"
                            disabled={isLoading}
                            onChange={(e) => setForm({ ...form, password: e.target.value })}
                        />
                    </div>
                    {error &&
                        <div className="text-red-600 text-center mt-2 mb-2">{error}</div>
                    }
                    <Button disabled={isLoading}>
                        {isLoading && (
                            <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
                        )}
                        Sign In
                    </Button>
                </div>
            </form>
            <div className="relative">
                <div className="absolute inset-0 flex items-center">
                    <span className="w-full border-t" />
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                    <span className="bg-background px-2 text-muted-foreground">
                        Or
                    </span>
                </div>
            </div>
            <Link href={LinksEnum.registration}
               className={cn(
                   buttonVariants({ variant: "outline" })
               )}
            >
                Sign Up
            </Link>
        </div>
    )
}