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
import { registerUser } from "@/lib/api";

interface UserAuthFormProps extends React.HTMLAttributes<HTMLDivElement> {}

export const RegistrationForm = ({ className, ...props }: UserAuthFormProps) => {

    const [form, setForm] = useState<{email: string, password: string, confirmPassword: string}>({ email: "", password: "", confirmPassword: "" });
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [error, setError] = useState<string>("");

    const onSubmit = (e: FormEvent) => {
        e.preventDefault();
        setError("");

        if (form.password !== form.confirmPassword) {
            setError("Password must be equal with confirm password")
            return;
        }
        if (form.password.length < 6) {
            setError("Password length must be at least 6")
            return;
        }
        setIsLoading(true);

        registerUser({ email: form.email, password: form.password }).then((res) => {
            signIn("credentials", { email: form.email, password: form.password, redirect: true, callbackUrl: "/todos" })
        }).catch((e) => {
            setError(getErrorMessage(e, "Registration error"))
        }).finally(() => {
            setIsLoading(false);
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
                            placeholder="password"
                            type="password"
                            autoCapitalize="none"
                            autoComplete="password"
                            autoCorrect="off"
                            disabled={isLoading}
                            onChange={(e) => setForm({ ...form, password: e.target.value })}
                        />
                    </div>
                    <div className="grid gap-1">
                        <Label className="sr-only" htmlFor="confirm-password">
                            Confirm Password
                        </Label>
                        <Input
                            id="confirm-password"
                            placeholder="confirm password"
                            type="password"
                            autoCapitalize="none"
                            autoComplete="password"
                            autoCorrect="off"
                            disabled={isLoading}
                            onChange={(e) => setForm({ ...form, confirmPassword: e.target.value })}
                        />
                    </div>
                    {error &&
                        <div className="text-red-600 text-center mt-2 mb-2">{error}</div>
                    }
                    <Button disabled={isLoading}>
                        {isLoading && (
                            <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
                        )}
                        Sign Up
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
            <Link href={LinksEnum.login}
               className={cn(
                   buttonVariants({ variant: "outline" })
               )}
            >
                Log In
            </Link>
        </div>
    )
}