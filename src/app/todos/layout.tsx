import { getServerSession } from "next-auth";
import React from "react";
import { redirect } from "next/navigation";
import { LinksEnum } from "@/enums";
import { Header } from "@/components/sys";
import { TodoProvider } from "@/contexts/TodoProvider";
import { UserProvider } from "@/contexts/UserProvider";
import { authOptions } from "@/lib/authOptions";

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