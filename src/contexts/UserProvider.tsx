"use client"


import React, { createContext, useEffect, useState } from "react";
import { IUser } from "@/types";
import { getUser } from "@/lib/api";
import { signOut } from "next-auth/react";

interface IUserContext {
    user: IUser | undefined;
    loading: boolean;
}

// @ts-ignore
export const UserContext = createContext<IUserContext>(null);

interface UserProviderProps {
    children: React.ReactNode;
}

export const UserProvider = ({ children }: UserProviderProps) => {

    const [user, setUser] = useState<IUser>();
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        getUser().then(res => {
            setUser(res);
        }).catch(() => {
            signOut();
        }).finally(() => {
            setLoading(false);
        })
    }, [])

    return (
        <UserContext.Provider value={{ user, loading }}>
            {children}
        </UserContext.Provider>
    )
}