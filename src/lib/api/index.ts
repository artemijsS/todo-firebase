import { signOut } from "next-auth/react";
import { redirect } from "next/navigation";
import { LinksEnum } from "@/enums";

export { registerUser, loginUser, getUser } from "./user";
export { getTodos, createTodo, removeTodoById, updateTodoById } from "./todo";


export const sendGet = async <T>({
  url,
}: {
    url: string,
}): Promise<T | never> => {
    return apiBridge<T>({ url, method: "GET" });
}

export const sendData = async <T>({
  url,
  data,
  method = "POST",
}: {
    url: string,
    data: any,
    method?: "POST" | "PATCH" | "PUT",
}): Promise<T | never> => {
    return apiBridge<T>({ url, method, data });
}

export const sendDelete = async <T>({
    url,
}: {
    url: string,
}): Promise<T | never> => {
    return apiBridge<T>({ url, method: "DELETE" });
}

const apiBridge = async <T>({
    url,
    method,
    data,
    cache = "no-cache",
}: {
    url: string,
    method: "POST" | "PUT" | "GET" | "DELETE" | "PATCH",
    data?: any,
    cache?: RequestCache,
}): Promise<T | never> => {
    let init: RequestInit = {};

    if (data) {
        init.headers = {
            "Content-Type": "application/json"
        }
        init.body = JSON.stringify(data);
    }

    init.cache = cache;
    init.method = method;

    const res = await fetch((typeof window === "undefined" ? process.env.NEXTAUTH_URL : "") + url, {
        ...init,
        headers: {
            ...init.headers,
        }
    });

    if (res.status === 401) {
        if (typeof window !== "undefined") {
            signOut();
        } else {
            redirect(LinksEnum.login);
        }
    }

    let body;

    try {
        body = await res.json();
    } catch {
        throw `Error with getting request ${url}`
    }

    if ((body.errors || body.error || body.message) && res.status !== 200) {
        throw body;
    }

    return body as T;
}
