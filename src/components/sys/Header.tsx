"use client";


import { cn } from "@/lib/utils";
import Link from "next/link";
import { LinksEnum } from "@/enums";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator
} from "../ui/dropdown-menu";
import { DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { signOut, useSession } from "next-auth/react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { usePathname } from "next/navigation";

export const Header = () => {

    const { data } = useSession();
    const pathname = usePathname();

    return (
        <>
            <div className="border-b container">
                <div className="flex h-16 items-center px-4">
                    <nav
                        className={cn("flex items-center space-x-4 lg:space-x-6")}
                    >
                        <Link
                            href={LinksEnum.todos}
                            className={`text-sm font-medium ${pathname === LinksEnum.todos ? "" : "text-muted-foreground"} transition-colors hover:text-primary`}
                        >
                            Todos
                        </Link>
                    </nav>
                    <div className="ml-auto"/>
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                                <Avatar className="h-8 w-8">
                                    <AvatarImage src={data?.user?.image || undefined} alt="@shadcn" />
                                    <AvatarFallback></AvatarFallback>
                                </Avatar>
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent className="w-56" align="end" forceMount>
                            <DropdownMenuLabel className="font-normal">
                                <div className="flex flex-col space-y-1">
                                    <p className="text-sm font-medium leading-none">{data?.user?.email}</p>
                                </div>
                            </DropdownMenuLabel>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem onClick={() => signOut()}>
                                Log out
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
            </div>
        </>
    )
}