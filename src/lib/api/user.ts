import { sendData, sendGet } from "@/lib/api/index";
import { IUser } from "@/types";

// GET
export const getUser = () => {
    return sendGet<IUser>({ url: "/api/user" })
}

// POST
export const loginUser = (form: { email: string, password: string }) => {
    return sendData({ url: "/api/user/login", data: form })
}
export const registerUser = (form: { email: string, password: string }) => {
    return sendData({ url: "/api/user/register", data: form })
}
