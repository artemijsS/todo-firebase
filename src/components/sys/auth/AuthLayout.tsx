import React from "react";

interface Props {
    title: string,
    description: string,
    children: React.ReactNode
}

export const AuthLayout = ({ title, description, children }: Props) => {
    return (
        <div className="container relative h-[100vh] flex-col items-center justify-center grid lg:max-w-none lg:grid-cols-2 lg:px-0 min-h-[500px] pl-1 pr-1 sm:pl-2 sm-pr-2">
            <div className="relative hidden h-full flex-col bg-muted p-10 text-white lg:flex dark:border-r">
                <div className="absolute inset-0 bg-zinc-900" />
            </div>
            <div className="lg:p-8">
                <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
                    <div className="flex flex-col space-y-2 text-center">
                        <h1 className="text-2xl font-semibold tracking-tight">
                            {title}
                        </h1>
                        <p className="text-sm text-muted-foreground">
                            {description}
                        </p>
                    </div>
                    {children}
                </div>
            </div>
        </div>
    )
}