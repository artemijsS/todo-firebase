import { getServerSession } from "next-auth";
import React from "react";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";
import { LinksEnum } from "@/enums";
import { Header } from "@/components/sys";
import { TodoProvider } from "@/contexts/TodoProvider";
import { UserProvider } from "@/contexts/UserProvider";

export default async function TodosLayout({ children }: { children: React.ReactNode }) {

    const session = await getServerSession(authOptions);

    if (!session) {
        redirect(LinksEnum.login);
        return;
    }

    return (
        <UserProvider>
            <TodoProvider>
                <Header />
                {children}
            </TodoProvider>
        </UserProvider>
    )
}